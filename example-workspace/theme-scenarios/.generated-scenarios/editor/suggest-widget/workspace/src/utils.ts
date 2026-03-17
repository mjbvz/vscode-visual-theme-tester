// Utility functions module
export class DataProcessor {
  processData(data: string[]): string[] {
    return data.map(item => item.trim());
  }

  validateData(data: string[]): boolean {
    return data.every(item => item.length > 0);
  }

  formatData(data: string[]): string {
    return data.join(', ');
  }

  sortData(data: string[]): string[] {
    return [...data].sort();
  }
}

export function createProcessor(): DataProcessor {
  return new DataProcessor();
}

export const DEFAULT_OPTIONS = {
  trimWhitespace: true,
  validateInput: true,
  sortOutput: false
};