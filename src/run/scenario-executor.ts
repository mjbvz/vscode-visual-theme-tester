import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { cpSync, existsSync } from 'node:fs';
import type { Page } from 'playwright';
import { ScenarioApiImpl } from './scenario-api.ts';
import type { ScenarioDelegate } from './scenario-api.ts';
import { getScriptPath, getWorkspaceDir } from '../generate/codegen.ts';
import type { Scenario, SavedScreenshot } from '../types.ts';
import type { Logger } from '../logger.ts';

export function copyFixturesToWorkspace(cacheDir: string, scenarioName: string, workspaceDir: string): void {
	const cachedWorkspace = getWorkspaceDir(cacheDir, scenarioName);
	if (existsSync(cachedWorkspace)) {
		cpSync(cachedWorkspace, workspaceDir, { recursive: true, force: true });
	}
}

export async function executeScenario(
	page: Page,
	scenario: Scenario,
	workspaceDir: string,
	opts: {
		log: Logger;
		settleDelay: number;
		cacheDir: string;
		delegate: ScenarioDelegate;
	},
): Promise<Map<string, SavedScreenshot[]>> {
	const scriptPath = getScriptPath(opts.cacheDir, scenario.name);
	if (!existsSync(scriptPath)) {
		throw new Error(`No generated script for "${scenario.name}". Run "generate" first.`);
	}

	const absPath = resolve(scriptPath);
	const fileUrl = pathToFileURL(absPath).href;
	const mod = await import(fileUrl);
	const fn = mod.default;

	if (typeof fn !== 'function') {
		throw new Error(`Generated code at ${scriptPath} does not export a default function`);
	}

	const helpers = new ScenarioApiImpl(page, opts.settleDelay, opts.log, opts.delegate);
	await fn(helpers);

	const result = new Map<string, SavedScreenshot[]>();
	for (const [theme, shots] of helpers.getScreenshotsByTheme()) {
		result.set(theme, shots.map((shot, i) => ({ index: i + 1, label: shot.label, buffer: shot.buffer })));
	}
	return result;
}
