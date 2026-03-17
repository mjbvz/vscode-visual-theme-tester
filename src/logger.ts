export type LogLevel = 'error' | 'info' | 'verbose';

export interface Logger {
	info(msg: string): void;
	verbose(msg: string): void;
	warn(msg: string): void;
	error(msg: string): void;
}

export function createLogger(level: LogLevel): Logger {
	return {
		info(msg: string) {
			if (level !== 'error') console.log(msg);
		},
		verbose(msg: string) {
			if (level === 'verbose') console.log(msg);
		},
		warn(msg: string) {
			console.warn(msg);
		},
		error(msg: string) {
			console.error(msg);
		},
	};
}
