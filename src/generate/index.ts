import { readFile, rm } from 'node:fs/promises';
import { relative, dirname, join } from 'node:path';
import { glob } from 'glob';
import type { GenerateConfig, Scenario } from '../types.ts';
import { generateScenarioCode } from './codegen.ts';
import { refineScenario } from './refine.ts';

export function scenarioNameFromPath(filePath: string, scenariosDir: string): string {
	const rel = relative(scenariosDir, filePath);
	return rel.replace(/\.prompt\.md$/, '');
}

export async function parseScenario(filePath: string, scenariosDir: string): Promise<Scenario> {
	const raw = await readFile(filePath, 'utf-8');
	return {
		name: scenarioNameFromPath(filePath, scenariosDir),
		prompt: raw.trim(),
		filePath,
	};
}

export async function discoverScenarios(scenariosDir: string, grep?: string): Promise<Scenario[]> {
	const pattern = join(scenariosDir, '**/*.prompt.md');
	const files = await glob(pattern, { ignore: [join(scenariosDir, '.generated-scenarios/**')] });
	let scenarios = await Promise.all(files.map(f => parseScenario(f, scenariosDir)));

	if (grep) {
		const normalized = grep.replace(/\.prompt\.md$/, '');
		const regexStr = normalized
			.replace(/[.+^${}()|[\]\\]/g, '\\$&')
			.replace(/\*\*/g, '\0')
			.replace(/\*/g, '[^/]*')
			.replace(/\0/g, '.*');
		const regex = new RegExp('^' + regexStr + '$');
		scenarios = scenarios.filter(s => regex.test(s.name));
	}

	return scenarios;
}

export async function generate(config: GenerateConfig): Promise<void> {
	const { log } = config;
	const cacheDir = join(config.scenariosDir, '.generated-scenarios');
	const scenarios = await discoverScenarios(config.scenariosDir, config.grep);
	if (scenarios.length === 0) {
		log.error(`No scenario files found in: ${config.scenariosDir}${config.grep ? ` (grep: ${config.grep})` : ''}`);
		process.exit(1);
	}
	log.info(`Found ${scenarios.length} scenario(s): ${scenarios.map(s => s.name).join(', ')}`);

	for (const scenario of scenarios) {
		await generateScenarioCode(
			scenario,
			config.apiKey,
			config.model,
			cacheDir,
			log,
			config.force,
		);

		if (config.refinementPasses > 0) {
			await refineScenario(scenario, {
				apiKey: config.apiKey,
				model: config.model,
				cacheDir,
				log,
				maxRefinements: config.refinementPasses,
				vscode: config.vscodePath,
			});
		}
	}

	if (config.force) {
		const scenarioNames = new Set(scenarios.map(s => s.name));
		try {
			const cachedScripts = await glob('**/scenario.mjs', { cwd: cacheDir });
			for (const script of cachedScripts) {
				const cachedName = dirname(script);
				if (!scenarioNames.has(cachedName)) {
					const stale = join(cacheDir, cachedName);
					log.info(`  Removing stale cache: ${cachedName}`);
					await rm(stale, { recursive: true, force: true });
				}
			}
		} catch { /* cache dir may not exist yet */ }
	}

	log.info(`\nDone. Cache: ${cacheDir}`);
}
