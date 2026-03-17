#!/usr/bin/env node

import { Command } from 'commander';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { generate } from './generate/index.ts';
import { run } from './run/index.ts';
import { createLogger } from './logger.ts';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

function requireApiKey(): string {
	const key = process.env.ANTHROPIC_API_KEY;
	if (!key) {
		console.error('Error: Set ANTHROPIC_API_KEY environment variable');
		process.exit(1);
	}
	return key;
}

const program = new Command();

program
	.name('vscode-visual-theme-tester')
	.description('Test VS Code themes by running AI-driven scenarios and capturing screenshots')
	.version(pkg.version);

program
	.command('generate')
	.description('Generate automation scripts and workspace fixtures from scenario prompts')
	.argument('[dir]', 'Path to scenarios folder', 'theme-scenarios')
	.option('--cwd <path>', 'Override working directory')
	.option('--grep <pattern>', 'Filter scenarios by name (supports * wildcards, e.g. editor/* or terminal)')
	.option('--model <name>', 'Claude model to use', 'claude-sonnet-4-20250514')
	.option('--force', 'Regenerate all scripts even if cached', false)
	.option('--refinement-passes <n>', 'Number of refinement rounds per scenario (0 = none)', '0')
	.option('--vscode-path <path>', 'Path to VS Code executable (only used for refinement)', undefined)
	.option('--log-level <level>', 'Log level: error, info, verbose', 'info')
	.action(async (dir: string, opts: Record<string, string | boolean>) => {
		if (opts.cwd) process.chdir(resolve(opts.cwd as string));

		await generate({
			scenariosDir: resolve(dir),
			grep: opts.grep as string | undefined,
			apiKey: requireApiKey(),
			model: opts.model as string,
			force: opts.force as boolean,
			log: createLogger(opts.logLevel as 'error' | 'info' | 'verbose'),
			refinementPasses: parseInt(opts.refinementPasses as string, 10),
			vscodePath: opts.vscodePath ? resolve(opts.vscodePath as string) : undefined,
		});
	});

program
	.command('run')
	.description('Run cached scenarios against one or more themes and capture screenshots')
	.argument('[dir]', 'Path to scenarios folder', 'theme-scenarios')
	.option('--cwd <path>', 'Override working directory')
	.option('--grep <pattern>', 'Filter scenarios by name (supports * wildcards, e.g. editor/* or terminal)')
	.option('--themes <names>', 'Comma-separated theme names to test', 'Default Dark Modern')
	.option('--extension <path>', 'Path to VS Code extension folder or VSIX')
	.option('--vscode-path <path>', 'Path to VS Code executable (auto-detect if omitted)')
	.option('--output <dir>', 'Output directory for screenshots', './theme-scenario-results')
	.option('--hide', 'Hide the VS Code window (moves offscreen)', false)
	.option('--settle-delay <ms>', 'Delay after actions in ms', '200')
	.option('--width <px>', 'VS Code window width', '1200')
	.option('--height <px>', 'VS Code window height', '800')
	.option('--zoom <level>', 'VS Code zoom level', '2')
	.option('--autogenerate', 'Automatically regenerate stale scripts before running', false)
	.option('--model <name>', 'Claude model (used with --autogenerate)', 'claude-sonnet-4-20250514')
	.option('--log-level <level>', 'Log level: error, info, verbose', 'info')
	.action(async (dir: string, opts: Record<string, string | string[] | boolean>) => {
		if (opts.cwd) process.chdir(resolve(opts.cwd as string));

		const extensionPath = opts.extension ? resolve(opts.extension as string) : undefined;
		if (extensionPath && !existsSync(extensionPath)) {
			console.error(`Error: Extension path does not exist: ${extensionPath}`);
			process.exit(1);
		}

		await run({
			scenariosDir: resolve(dir),
			grep: opts.grep as string | undefined,
			themes: (opts.themes as string).split(',').map(t => t.trim()),
			extensionPath: extensionPath,
			vscodePath: opts.vscodePath ? resolve(opts.vscodePath as string) : undefined,
			output: resolve(opts.output as string),
			hide: opts.hide as boolean,
			log: createLogger(opts.logLevel as 'error' | 'info' | 'verbose'),
			settleDelay: parseInt(opts.settleDelay as string, 10),
			windowWidth: parseInt(opts.width as string, 10),
			windowHeight: parseInt(opts.height as string, 10),
			zoomLevel: parseInt(opts.zoom as string, 10),
			autogenerate: opts.autogenerate ? {
				apiKey: requireApiKey(),
				model: opts.model as string,
			} : undefined,
		});
	});

program.parse();
