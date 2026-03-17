import { mkdir, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import type { RunConfig } from '../types.ts';
import { launchVSCode, changeTheme, switchTheme } from './vscode-launcher.ts';
import { executeScenario, copyFixturesToWorkspace } from './scenario-executor.ts';
import { discoverScenarios } from '../generate/index.ts';
import { generateScenarioCode } from '../generate/codegen.ts';

export async function run(config: RunConfig): Promise<void> {
	const { log } = config;
	const cacheDir = join(config.scenariosDir, '.generated-scenarios');
	const scenarios = await discoverScenarios(config.scenariosDir, config.grep);
	if (scenarios.length === 0) {
		log.error(`No scenario files found in: ${config.scenariosDir}${config.grep ? ` (grep: ${config.grep})` : ''}`);
		process.exit(1);
	}
	log.info(`Found ${scenarios.length} scenario(s): ${scenarios.map(s => s.name).join(', ')}`);
	log.info(`Themes: ${config.themes.join(', ')}`);

	const tmpWorkspaceDir = await mkdtemp(join(tmpdir(), 'theme-test-workspace-'));
	log.verbose(`Using workspace: ${tmpWorkspaceDir}`);

	for (const scenario of scenarios) {
		if (config.autogenerate) {
			await generateScenarioCode(
				scenario,
				config.autogenerate.apiKey,
				config.autogenerate.model,
				cacheDir,
				log,
			);
		}
		copyFixturesToWorkspace(cacheDir, scenario.name, tmpWorkspaceDir);
	}

	try {
		for (const scenario of scenarios) {
			log.info(`\nScenario: ${scenario.name}`);
			log.info('─'.repeat(40));

			// Launch VS Code once with the first theme
			await changeTheme(tmpWorkspaceDir, config.themes[0], config.zoomLevel);

			const instance = await launchVSCode({
				vscodePath: config.vscodePath,
				extensionPath: config.extensionPath,
				workspace: tmpWorkspaceDir,
				hide: config.hide,
				log,
				windowWidth: config.windowWidth,
				windowHeight: config.windowHeight,
				zoomLevel: config.zoomLevel,
			});

			try {
				const screenshotsByTheme = await executeScenario(instance.page, scenario, tmpWorkspaceDir, {
					log,
					settleDelay: config.settleDelay,
					cacheDir,
					delegate: {
						async runWithThemes(cb) {
							for (const theme of config.themes) {
								await switchTheme(instance.page, tmpWorkspaceDir, theme, config.zoomLevel, log);
								await cb(theme);
							}
						},
					},
				});

				for (const [theme, screenshots] of screenshotsByTheme) {
					const dir = join(config.output, sanitize(scenario.name), sanitize(theme));
					await rm(dir, { recursive: true, force: true }).catch(() => { });
					await mkdir(dir, { recursive: true });

					for (const shot of screenshots) {
						const path = join(dir, `${shot.index}-${shot.label}.png`);
						await writeFile(path, shot.buffer);
						log.info(`    📸 ${relative(process.cwd(), path)} [${theme}]`);
					}
				}
			} finally {
				await instance.cleanup();
			}
		}
	} finally {
		await rm(tmpWorkspaceDir, { recursive: true, force: true }).catch(() => { });
	}

	log.info(`\nDone. Output: ${config.output}`);
}

function sanitize(name: string): string {
	return name.replace(/[^a-zA-Z0-9_\-. /]/g, '_');
}
