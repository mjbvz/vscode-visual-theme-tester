import { resolve, join, dirname } from 'node:path';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.js';
import type { Scenario } from '../types.ts';
import type { Logger } from '../logger.ts';
import { launchVSCode, changeTheme, resetEditors } from '../run/vscode-launcher.ts';
import { ScenarioApiImpl } from '../run/scenario-api.ts';
import { getScriptPath, getWorkspaceDir } from './codegen.ts';
import { copyFixturesToWorkspace } from '../run/scenario-executor.ts';

const REFINE_TOOLS: Anthropic.Tool[] = [
	{
		name: 'write_file',
		description: 'Write or update a workspace fixture file.',
		input_schema: {
			type: 'object' as const,
			properties: {
				path: { type: 'string', description: 'Relative file path' },
				content: { type: 'string', description: 'Full file content' },
			},
			required: ['path', 'content'],
		},
	},
	{
		name: 'write_script',
		description: 'Write a new version of the scenario automation script. Must be valid ESM JavaScript exporting a default async function.',
		input_schema: {
			type: 'object' as const,
			properties: {
				code: { type: 'string', description: 'The full ESM JavaScript code' },
			},
			required: ['code'],
		},
	},
	{
		name: 'approve',
		description: 'Call this when the screenshots look correct and the scenario is working as intended.',
		input_schema: {
			type: 'object' as const,
			properties: {
				reason: { type: 'string', description: 'Why the screenshots are acceptable' },
			},
			required: ['reason'],
		},
	},
];

const REFINE_SYSTEM = `You are reviewing and refining a VS Code automation scenario.

You will receive:
1. The original scenario prompt
2. The current automation script
3. Screenshots captured when the script was run

Your job is to review the screenshots and determine if the scenario was executed correctly:
- Are the right UI elements visible?
- Does the screenshot show what the scenario asked for?
- Are there any errors, missing elements, or wrong states?

If everything looks good, call the approve tool.
If something needs fixing, call write_file and/or write_script to fix the issues, then the script will be re-run.

The script helpers API:
- helpers.openFile(filename) — Quick Open a file
- helpers.runCommand(command) — Run a Command Palette command
- helpers.pressKey(key) — Press a key or combo (e.g. "Enter", "Meta+S", "ArrowDown")
- helpers.typeText(text, delay?) — Type text
- helpers.wait(ms) — Wait
- helpers.saveScreenshot(description) — Capture a screenshot

Platform: ${process.platform === 'darwin' ? 'macOS (use "Meta" for Cmd)' : 'Linux/Windows (use "Control" for Ctrl)'}

Common issues to watch for:
- Command palette not fully typed before Enter is pressed (add more wait time)
- File not found because the filename in openFile doesn't match write_file path
- UI widgets closed before screenshot was taken
- Wrong key names (use ArrowDown not Down, Escape not Esc)`;

export interface RefineOptions {
	apiKey: string;
	model: string;
	cacheDir: string;
	log: Logger;
	maxRefinements: number;
	vscode?: string;
}

export async function refineScenario(
	scenario: Scenario,
	opts: RefineOptions,
): Promise<void> {
	const { log } = opts;
	const scriptPath = getScriptPath(opts.cacheDir, scenario.name);
	const workspaceDir = getWorkspaceDir(opts.cacheDir, scenario.name);

	const client = new Anthropic({ apiKey: opts.apiKey });

	for (let round = 0; round < opts.maxRefinements; round++) {
		log.info(`  Refine round ${round + 1}/${opts.maxRefinements}`);

		// Run the scenario and capture screenshots
		const { screenshots, error } = await runAndCapture(scenario, opts);

		// Read current script
		const currentScript = await readFile(scriptPath, 'utf-8');

		// Build message with screenshots
		const content: Array<Anthropic.ImageBlockParam | Anthropic.TextBlockParam> = [
			{
				type: 'text',
				text: `Original scenario prompt:\n${scenario.prompt}\n\nCurrent script:\n\`\`\`javascript\n${currentScript}\n\`\`\`\n\n${error ? `Script error: ${error}\n\n` : ''}${screenshots.length} screenshot(s) captured:`,
			},
		];

		for (let i = 0; i < screenshots.length; i++) {
			content.push({
				type: 'image',
				source: {
					type: 'base64',
					media_type: 'image/png',
					data: screenshots[i].toString('base64'),
				},
			});
			content.push({
				type: 'text',
				text: `Screenshot ${i + 1}`,
			});
		}

		if (screenshots.length === 0) {
			content.push({
				type: 'text',
				text: 'No screenshots were captured. The script likely failed before any saveScreenshot calls.',
			});
		}

		const messages: MessageParam[] = [
			{ role: 'user', content },
		];

		// Ask Claude to review
		let approved = false;

		for (let iter = 0; iter < 5; iter++) {
			const response = await client.messages.create({
				model: opts.model,
				max_tokens: 16384,
				system: REFINE_SYSTEM,
				tools: REFINE_TOOLS,
				messages,
			});

			messages.push({ role: 'assistant', content: response.content });

			const toolUses = response.content.filter(b => b.type === 'tool_use');

			if (toolUses.length === 0 || response.stop_reason === 'end_turn') {
				// If Claude just responded with text and no tools, treat as approved
				approved = true;
				break;
			}

			const results: Array<{ type: 'tool_result'; tool_use_id: string; content: string }> = [];
			let needsRerun = false;

			for (const toolUse of toolUses) {
				const input = toolUse.input as Record<string, string>;

				if (toolUse.name === 'approve') {
					log.info(`  Approved: ${input.reason}`);
					approved = true;
					results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: 'ok' });
				} else if (toolUse.name === 'write_file') {
					const absPath = join(workspaceDir, input.path);
					await mkdir(dirname(absPath), { recursive: true });
					await writeFile(absPath, input.content);
					log.verbose(`    Updated file: ${input.path}`);
					needsRerun = true;
					results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: 'ok' });
				} else if (toolUse.name === 'write_script') {
					const header = currentScript.split('\n').filter(l => l.startsWith('//')).join('\n') + '\n\n';
					await writeFile(scriptPath, header + input.code + '\n');
					log.verbose(`    Updated script: ${input.code.length} chars`);
					needsRerun = true;
					results.push({ type: 'tool_result', tool_use_id: toolUse.id, content: 'ok' });
				}
			}

			messages.push({ role: 'user', content: results });

			if (approved) break;
			if (needsRerun) break; // Break inner loop to re-run the script
		}

		if (approved) {
			log.info(`  Scenario "${scenario.name}" refined and approved`);
			return;
		}
	}

	log.warn(`  Max refinement rounds reached for "${scenario.name}"`);
}

async function runAndCapture(
	scenario: Scenario,
	opts: RefineOptions,
): Promise<{ screenshots: Buffer[]; error?: string }> {
	const workspaceDir = getWorkspaceDir(opts.cacheDir, scenario.name);
	const scriptPath = getScriptPath(opts.cacheDir, scenario.name);

	const tempWorkspace = await mkdtemp(join(tmpdir(), 'theme-test-refine-'));
	copyFixturesToWorkspace(opts.cacheDir, scenario.name, tempWorkspace);

	await changeTheme(tempWorkspace, 'Default Dark Modern', 1);

	const instance = await launchVSCode({
		vscodePath: opts.vscode,
		workspace: tempWorkspace,
		hide: false,
		log: opts.log,
		windowWidth: 1920,
		windowHeight: 1080,
		zoomLevel: 1,
	});

	let error: string | undefined;
	const helpers = new ScenarioApiImpl(instance.page, 500, opts.log, {
		async runWithThemes(cb) {
			await cb('Default Dark Modern');
		},
	});

	try {
		const absPath = resolve(scriptPath);
		// Add cache-busting query param so Node doesn't serve stale module
		const fileUrl = pathToFileURL(absPath).href + `?t=${Date.now()}`;
		const mod = await import(fileUrl);
		await mod.default(helpers);
	} catch (err) {
		error = err instanceof Error ? err.message : String(err);
		opts.log.warn(`    Script error: ${error}`);
	}

	const allShots = helpers.getScreenshotsByTheme();
	const screenshots = (allShots.get('Default Dark Modern') ?? []).map(s => s.buffer);

	await instance.cleanup();
	await rm(tempWorkspace, { recursive: true, force: true }).catch(() => { });

	return { screenshots, error };
}
