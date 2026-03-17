import type { Page } from 'playwright';
import type { Logger } from '../logger.ts';

/**
 * The api object passed to scenario functions.
 */
export interface ScenarioAPI {
	pressKey(key: string): Promise<void>;
	typeText(text: string, delay?: number): Promise<void>;
	runCommand(command: string): Promise<void>;
	openFile(filename: string): Promise<void>;
	wait(ms: number): Promise<void>;
	saveScreenshot(description?: string): Promise<void>;
}


export interface ScenarioDelegate {
	runWithThemes(cb: (theme: string) => Promise<void>): Promise<void>;
}

export class ScenarioApiImpl implements ScenarioAPI {
	private readonly page: Page;
	private readonly settleDelay: number;
	private readonly screenshots = new Map<string, Array<{ buffer: Buffer; label: string }>>();
	private readonly mod: string;
	private readonly log: Logger;
	private readonly delegate: ScenarioDelegate;

	constructor(page: Page, settleDelay: number, log: Logger, delegate: ScenarioDelegate) {
		this.page = page;
		this.settleDelay = settleDelay;
		this.mod = process.platform === 'darwin' ? 'Meta' : 'Control';
		this.log = log;
		this.delegate = delegate;
	}

	private static KEY_ALIASES: Record<string, string> = {
		'Down': 'ArrowDown',
		'Up': 'ArrowUp',
		'Left': 'ArrowLeft',
		'Right': 'ArrowRight',
		'Return': 'Enter',
		'Esc': 'Escape',
		'Del': 'Delete',
		'Cmd': 'Meta',
		'Ctrl': 'Control',
		'Option': 'Alt',
	};

	private normalizeKey(key: string): string {
		return key.split('+').map(k => ScenarioApiImpl.KEY_ALIASES[k] ?? k).join('+');
	}

	async pressKey(key: string): Promise<void> {
		await this.page.keyboard.press(this.normalizeKey(key));
		await this.page.waitForTimeout(this.settleDelay);
	}

	async typeText(text: string, _delay = 0): Promise<void> {
		await this.page.keyboard.type(text, { delay: 0 });
		await this.page.waitForTimeout(this.settleDelay);
	}

	async runCommand(command: string): Promise<void> {
		await this.page.keyboard.press(`${this.mod}+Shift+P`);
		await this.page.waitForTimeout(200);
		await this.page.keyboard.type(command, { delay: 0 });
		await this.page.waitForTimeout(200);
		await this.page.keyboard.press('Enter');
		await this.page.waitForTimeout(this.settleDelay);
	}

	async openFile(filename: string): Promise<void> {
		await this.page.keyboard.press(`${this.mod}+P`);
		await this.page.waitForTimeout(200);
		await this.page.keyboard.type(filename, { delay: 0 });
		await this.page.waitForTimeout(200);
		await this.page.keyboard.press('Enter');
		await this.page.waitForTimeout(this.settleDelay);
	}

	async wait(ms: number): Promise<void> {
		await this.page.waitForTimeout(ms);
	}

	async saveScreenshot(description?: string): Promise<void> {
		const label = description
			? description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
			: 'screenshot';

		await this.delegate.runWithThemes(async (theme) => {
			const buffer = await this.page.screenshot({ type: 'png' });
			if (!this.screenshots.has(theme)) {
				this.screenshots.set(theme, []);
			}
			this.screenshots.get(theme)!.push({ buffer, label });
		});
	}

	getScreenshotsByTheme(): ReadonlyMap<string, Array<{ buffer: Buffer; label: string }>> {
		return this.screenshots;
	}
}
