/**
 * A simple calculator class for basic arithmetic operations
 */
export class Calculator {
    private history: string[] = [];

    /**
     * Adds two numbers
     */
    add(a: number, b: number): number {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }

    /**
     * Subtracts b from a
     */
    subtract(a: number, b: number): number {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }

    /**
     * Multiplies two numbers
     */
    multiply(a: number, b: number): number {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }

    /**
     * Gets the calculation history
     */
    getHistory(): string[] {
        return [...this.history];
    }

    /**
     * Clears the calculation history
     */
    clearHistory(): void {
        this.history = [];
    }
}