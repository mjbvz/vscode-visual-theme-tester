import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import type { Tool, MessageParam } from '@anthropic-ai/sdk/resources/messages.js';
import type { Scenario } from '../types.ts';
import type { Logger } from '../logger.ts';

const TOOLS: Tool[] = [
	{
		name: 'write_file',
		description: 'Write a workspace fixture file needed by the scenario. Call once per file.',
		input_schema: {
			type: 'object' as const,
			properties: {
				path: { type: 'string', description: 'Relative file path (e.g. "src/app.ts")' },
				content: { type: 'string', description: 'Full file content' },
			},
			required: ['path', 'content'],
		},
	},
	{
		name: 'write_script',
		description: 'Write the scenario automation script. Call exactly once, after all write_file calls. The script must be valid ESM JavaScript that exports a default async function taking a helpers object.',
		input_schema: {
			type: 'object' as const,
			properties: {
				code: { type: 'string', description: 'The full ESM JavaScript code for the scenario script' },
			},
			required: ['code'],
		},
	},
];

const SYSTEM_PROMPT = `You generate VS Code automation scenarios using tools.

Given a scenario description, you must:
1. Call write_file for each workspace fixture file the scenario needs. Create realistic, concise content — real code with imports, types, functions, comments.
2. Call write_script with the automation code.

The script must export a default async function using these helpers:
- helpers.openFile(filename) — Quick Open a file (use exact paths from write_file calls)
- helpers.runCommand(command) — Run a VS Code Command Palette command
- helpers.pressKey(key) — Press a key or combo (e.g. "Enter", "Meta+S")
- helpers.typeText(text, delay?) — Type text character by character
- helpers.wait(ms) — Wait for a duration
- helpers.saveScreenshot(description) — Capture a screenshot. Always pass a short description.

Platform: ${process.platform === 'darwin' ? 'macOS — use "Meta" for Cmd key' : 'Linux/Windows — use "Control" for Ctrl key'}

RULES:
- Keep the workspace MINIMAL — only files directly needed by the scenario. Prefer fewer, shorter files. Each file should be 10–30 lines max unless the scenario explicitly needs more. Do NOT create extra files "for realism" — only what the script actually opens or references.
- Call saveScreenshot() whenever the scenario says to take a screenshot.
- Add waits after actions that trigger animations or loading (300–500ms).
- The script must be valid ESM JavaScript (no TypeScript syntax, no require).
- Call write_file for ALL files BEFORE calling write_script.
- After opening a file, only run "View: Focus Active Editor Group" if you need to type or press keys in the editor afterwards. Do not use it when you just need to view or screenshot the file.
- Unless the scenario specifically tests the sidebar, panel, or secondary sidebar, hide them to keep the screenshot focused on the area being tested. Use commands like "View: Close Sidebar", "View: Close Panel", and "View: Close Secondary Side Bar".

COMMAND & KEYBINDING RULES — VERY IMPORTANT:
- helpers.runCommand(name) opens the Command Palette, types the name, and presses Enter. The name MUST be a real command that appears in VS Code's Command Palette (Cmd+Shift+P). Do NOT invent command names.
- ALWAYS prefer helpers.runCommand over helpers.pressKey when a valid command palette entry exists. This avoids platform-specific keybinding issues.
- Valid command palette entries to use:
  - "Trigger Suggest" — opens autocomplete
  - "Trigger Parameter Hints" — shows parameter info
  - "Go to Line..." — opens line picker (then type the number and press Enter)
  - "Find" / "Replace" — opens find/replace
  - "Select All" — selects all text
  - "View: Close Sidebar", "View: Close Panel", "View: Close Secondary Side Bar"
  - "View: Focus Active Editor Group"
  - "View: Toggle Terminal"
- For cursor movement (start/end of file, start/end of line), there are NO command palette entries. Use helpers.pressKey instead:
  - End of line: helpers.pressKey("End")
  - Start of line: helpers.pressKey("Home")
  - For navigating to a specific line: helpers.runCommand("Go to Line...") then helpers.typeText(lineNumber) then helpers.pressKey("Enter")
- Only use helpers.pressKey for simple keys like "Enter", "Escape", "Tab", "ArrowDown", "ArrowUp", "Home", "End", or when no command palette equivalent exists.
- NEVER use platform-specific modifier combos like Meta+End, Ctrl+Home, Meta+Down — they differ across platforms.
- If you need to get to the end of a file, prefer designing the workspace fixture so the cursor is already near the right position after opening, or use "Go to Line..." to navigate there.`;

export function promptHash(prompt: string): string {
	return createHash('sha256').update(prompt).digest('hex').slice(0, 12);
}

export function getScenarioDir(cacheDir: string, scenarioName: string): string {
	return join(cacheDir, scenarioName);
}

export function getScriptPath(cacheDir: string, scenarioName: string): string {
	return join(getScenarioDir(cacheDir, scenarioName), 'scenario.mjs');
}

export function getWorkspaceDir(cacheDir: string, scenarioName: string): string {
	return join(getScenarioDir(cacheDir, scenarioName), 'workspace');
}

export async function generateScenarioCode(
	scenario: Scenario,
	apiKey: string,
	model: string,
	cacheDir: string,
	log: Logger,
	force = false,
): Promise<string> {
	const scriptPath = getScriptPath(cacheDir, scenario.name);
	const workspaceDir = getWorkspaceDir(cacheDir, scenario.name);
	const hash = promptHash(scenario.prompt);

	// Check cache
	if (!force && existsSync(scriptPath)) {
		const existing = await readFile(scriptPath, 'utf-8');
		const hashLine = existing.split('\n').find(l => l.includes('prompt-hash:'));
		const cachedHash = hashLine?.match(/prompt-hash:\s*(\w+)/)?.[1];
		if (cachedHash === hash) {
			log.verbose(`  Cache hit: ${scenario.name}`);
			return scriptPath;
		}
		log.verbose(`  Prompt changed, regenerating: ${scenario.name}`);
	}

	log.info(`  Generating code for: ${scenario.name}`);

	const scenarioDir = getScenarioDir(cacheDir, scenario.name);

	try {
		const client = new Anthropic({ apiKey });
		const messages: MessageParam[] = [
			{
				role: 'user',
				content: `Scenario: "${scenario.name}"\n\n${scenario.prompt}`,
			},
		];

		await mkdir(workspaceDir, { recursive: true });
		await mkdir(dirname(scriptPath), { recursive: true });

		let scriptCode: string | null = null;
		let fileCount = 0;
		const MAX_ITERATIONS = 25;
		const MAX_FILES = 50;

		// Tool-use loop
		for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
			const response = await client.messages.create({
				model,
				max_tokens: 16384,
				system: SYSTEM_PROMPT,
				tools: TOOLS,
				messages,
			});

			messages.push({ role: 'assistant', content: response.content });

			const toolUses = response.content.filter(
				(b) => b.type === 'tool_use'
			);

			if (toolUses.length === 0 || response.stop_reason === 'end_turn') {
				break;
			}

			const results: Array<{ type: 'tool_result'; tool_use_id: string; content: string }> = [];

			for (const toolUse of toolUses) {
				const input = toolUse.input as Record<string, string>;

				if (toolUse.name === 'write_file') {
					if (fileCount >= MAX_FILES) {
						results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: `error: file limit (${MAX_FILES}) reached — do not create more files` });
						continue;
					}
					const absPath = join(workspaceDir, input.path);
					await mkdir(dirname(absPath), { recursive: true });
					await writeFile(absPath, input.content);
					fileCount++;
					log.verbose(`    write_file: ${input.path}`);
					results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: 'ok' });
				} else if (toolUse.name === 'write_script') {
					scriptCode = input.code;
					log.verbose(`    write_script: ${scriptCode.length} chars`);
					results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: 'ok' });
				}
			}

			messages.push({ role: 'user', content: results });

			if (scriptCode) break;
		}

		if (!scriptCode) {
			throw new Error(`Code generation for "${scenario.name}" did not produce a script`);
		}

		const header = [
			`// Auto-generated scenario code`,
			`// Source: ${scenario.filePath}`,
			`// prompt-hash: ${hash}`,
			`// Generated: ${new Date().toISOString()}`,
			`// Model: ${model}`,
			'',
			'',
		].join('\n');

		await writeFile(scriptPath, header + scriptCode + '\n');

		log.info(`  Generated: ${fileCount} file(s) + script`);
		log.verbose(`  Wrote: ${scriptPath}`);
		return scriptPath;
	} catch (err) {
		log.error(`  Failed to generate: ${scenario.name}`);
		await rm(scenarioDir, { recursive: true, force: true }).catch(() => {});
		throw err;
	}
}
