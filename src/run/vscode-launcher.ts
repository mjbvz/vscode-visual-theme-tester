import { _electron as electron } from 'playwright';
import type { ElectronApplication, Page } from 'playwright';
import { mkdtemp, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import type { VSCodeInstance } from '../types.ts';
import type { Logger } from '../logger.ts';

const VSCODE_PATHS: Record<string, string[]> = {
	darwin: [
		'/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron',
		'/Applications/Visual Studio Code.app/Contents/MacOS/Electron',
	],
	linux: ['/usr/bin/code-insiders', '/usr/bin/code'],
	win32: [
		`${process.env.LOCALAPPDATA}\\Programs\\Microsoft VS Code Insiders\\Code - Insiders.exe`,
		`${process.env.LOCALAPPDATA}\\Programs\\Microsoft VS Code\\Code.exe`,
	],
};

function findVSCode(): string {
	const candidates = VSCODE_PATHS[process.platform] ?? [];
	for (const p of candidates) {
		if (existsSync(p)) return p;
	}
	throw new Error(
		`Could not auto-detect VS Code. Provide --vscode-path. Searched: ${candidates.join(', ')}`
	);
}

export interface LaunchOptions {
	vscodePath?: string;
	extensionPath?: string;
	workspace: string;
	hide?: boolean;
	log: Logger;
	windowWidth: number;
	windowHeight: number;
	zoomLevel: number;
}

export async function launchVSCode(opts: LaunchOptions): Promise<VSCodeInstance & { cleanup: () => Promise<void> }> {
	const executablePath = opts.vscodePath ?? findVSCode();
	const userDataDir = await mkdtemp(join(tmpdir(), 'theme-test-userdata-'));
	const extensionsDir = await mkdtemp(join(tmpdir(), 'theme-test-extensions-'));

	const args = [
		opts.workspace,
		'--transient',
		`--user-data-dir=${userDataDir}`,
		`--extensions-dir=${extensionsDir}`,
		'--disable-telemetry',
		'--disable-workspace-trust',
		'--disable-updates',
		'--skip-welcome',
		'--skip-release-notes',
		'--use-inmemory-secretstorage',
	];

	if (opts.extensionPath) {
		args.push(`--extensionDevelopmentPath=${opts.extensionPath}`);
	}

	opts.log.verbose(`Launching VS Code: ${executablePath}`);
	opts.log.verbose(`  args: ${args.join(' ')}`);

	const app = await electron.launch({
		executablePath,
		args,
		env: {
			...process.env,
			NODE_ENV: 'test',
		},
		timeout: 60_000,
	});

	const page = app.windows()[0] ?? await app.waitForEvent('window', { timeout: 30_000 });

	// Set the content area size (excludes title bar) so screenshots match
	await app.evaluate(async ({ BrowserWindow }, { width, height, hide }) => {
		const win = BrowserWindow.getAllWindows()[0];
		if (win) {
			win.setContentSize(width, height);
			if (hide) {
				// Move offscreen so it doesn't steal focus, but keep visible for rendering
				win.setPosition(-10000, -10000);
			} else {
				win.center();
			}
		}
	}, { width: opts.windowWidth, height: opts.windowHeight, hide: opts.hide ?? false });

	// Sync Playwright's viewport to match the content size
	await page.setViewportSize({ width: opts.windowWidth, height: opts.windowHeight });

	await waitForReady(page);

	const cleanup = async () => {
		await app.close().catch(() => { });
		await rm(userDataDir, { recursive: true, force: true }).catch(() => { });
		await rm(extensionsDir, { recursive: true, force: true }).catch(() => { });
	};

	return { app, page, cleanup };
}

async function waitForReady(page: Page): Promise<void> {
	await page.waitForSelector('.monaco-workbench', { timeout: 30_000 });
	await page.waitForTimeout(2_000);
}

function getThemeClass(classes: string): string | undefined {
	return classes.split(/\s+/).find(c =>
		c.startsWith('vscode-theme-') || c.includes('-themes-') || c.includes('_publisher-')
	);
}

async function getCurrentThemeClass(page: Page): Promise<string | undefined> {
	const classes = await page.evaluate(() => {
		const el = document.querySelector('.monaco-workbench');
		return el?.className ?? '';
	});
	return getThemeClass(classes);
}

function themeMatchesName(themeClass: string, themeName: string): boolean {
	const keywords = themeName.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 1);
	const normalizedClass = themeClass.toLowerCase();
	return keywords.every(kw => normalizedClass.includes(kw));
}

export async function switchTheme(page: Page, workspaceDir: string, themeName: string, zoomLevel: number, log: Logger): Promise<void> {
	// Check if the theme is already active
	const currentClass = await getCurrentThemeClass(page);
	if (currentClass && themeMatchesName(currentClass, themeName)) {
		log.verbose(`    Theme "${themeName}" already active`);
		return;
	}

	await changeTheme(workspaceDir, themeName, zoomLevel);

	// Wait for class to change from current, then confirm it matches
	const timeout = 10_000;
	const interval = 200;
	const start = Date.now();

	while (Date.now() - start < timeout) {
		const newClass = await getCurrentThemeClass(page);
		if (newClass && newClass !== currentClass) {
			log.verbose(`    Theme changed: ${currentClass} → ${newClass}`);
			return;
		}
		await page.waitForTimeout(interval);
	}

	log.info(`    Warning: Theme "${themeName}" may not have been applied`);
}

export async function changeTheme(workspaceDir: string, themeName: string, zoomLevel: number): Promise<void> {
	const settingsDir = join(workspaceDir, '.vscode');
	const settingsPath = join(settingsDir, 'settings.json');

	let settings: Record<string, unknown> = {};
	if (existsSync(settingsPath)) {
		const raw = await readFile(settingsPath, 'utf-8');
		settings = JSON.parse(raw);
	}

	settings['workbench.colorTheme'] = themeName;
	settings['window.zoomLevel'] = zoomLevel;
	settings['extensions.ignoreRecommendations'] = true;
	settings['extensions.showRecommendationsOnlyOnDemand'] = true;

	await mkdir(settingsDir, { recursive: true });
	await writeFile(settingsPath, JSON.stringify(settings, null, 2));
}

export async function resetEditors(page: Page): Promise<void> {
	await page.keyboard.press('Escape');
	await page.keyboard.press('Escape');
	await page.waitForTimeout(50);

	const mod = process.platform === 'darwin' ? 'Meta' : 'Control';
	await page.keyboard.press(`${mod}+Shift+P`);
	await page.waitForTimeout(150);
	await page.keyboard.type('Close All Editors', { delay: 0 });
	await page.keyboard.press('Enter');
	await page.waitForTimeout(100);

	await page.keyboard.press(`${mod}+Shift+P`);
	await page.waitForTimeout(150);
	await page.keyboard.type('View: Show Explorer', { delay: 0 });
	await page.keyboard.press('Enter');
	await page.waitForTimeout(100);
}
