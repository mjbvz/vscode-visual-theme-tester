import type { ElectronApplication, Page } from 'playwright';
import type { Logger } from './logger.ts';

export interface Scenario {
	readonly name: string;
	readonly prompt: string;
	readonly filePath: string;
}

export interface GenerateConfig {
	readonly scenariosDir: string;
	readonly grep?: string;
	readonly apiKey: string;
	readonly model: string;
	readonly force: boolean;
	readonly log: Logger;
	readonly refinementPasses: number;
	readonly vscodePath?: string;
}

export interface RunConfig {
	readonly scenariosDir: string;
	readonly grep?: string;
	readonly themes: readonly string[];
	readonly extensionPath?: string;
	readonly vscodePath?: string;
	readonly output: string;
	readonly hide: boolean;
	readonly log: Logger;
	readonly settleDelay: number;
	readonly windowWidth: number;
	readonly windowHeight: number;
	readonly zoomLevel: number;
	readonly autogenerate?: { readonly apiKey: string; readonly model: string };
}

export interface VSCodeInstance {
	readonly app: ElectronApplication;
	readonly page: Page;
}

export interface SavedScreenshot {
	readonly index: number;
	readonly label: string;
	readonly buffer: Buffer;
}
