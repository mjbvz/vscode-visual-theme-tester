/**
 * Utility classes and functions for common operations
 */

export class StringUtils {
    /**
     * Capitalizes the first letter of a string
     */
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Converts string to kebab-case
     */
    static toKebabCase(str: string): string {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();
    }
}

export class ArrayUtils {
    /**
     * Removes duplicate items from an array
     */
    static unique<T>(arr: T[]): T[] {
        return [...new Set(arr)];
    }

    /**
     * Chunks array into smaller arrays of specified size
     */
    static chunk<T>(arr: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}