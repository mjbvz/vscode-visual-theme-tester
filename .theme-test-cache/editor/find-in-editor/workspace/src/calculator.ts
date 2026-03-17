/**
 * Simple calculator utility functions
 */

export class Calculator {
  private history: number[] = [];

  /**
   * Adds two numbers and records the result
   */
  public calculate(a: number, b: number, operation: string): number {
    let result: number;
    
    switch (operation) {
      case 'add':
        result = this.calculate_add(a, b);
        break;
      case 'subtract':
        result = this.calculate_subtract(a, b);
        break;
      case 'multiply':
        result = this.calculate_multiply(a, b);
        break;
      case 'divide':
        result = this.calculate_divide(a, b);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
    
    this.history.push(result);
    return result;
  }

  private calculate_add(x: number, y: number): number {
    return x + y;
  }

  private calculate_subtract(x: number, y: number): number {
    return x - y;
  }

  private calculate_multiply(x: number, y: number): number {
    return x * y;
  }

  private calculate_divide(x: number, y: number): number {
    if (y === 0) {
      throw new Error('Cannot divide by zero');
    }
    return x / y;
  }

  /**
   * Gets the calculation history
   */
  public getHistory(): number[] {
    return [...this.history];
  }

  /**
   * Clears the calculation history
   */
  public clearHistory(): void {
    this.history = [];
  }
}

// Usage example
const calc = new Calculator();
const result1 = calc.calculate(10, 5, 'add');
const result2 = calc.calculate(20, 4, 'divide');
const result3 = calc.calculate(result1, result2, 'multiply');

console.log('Results:', result1, result2, result3);
console.log('History:', calc.getHistory());