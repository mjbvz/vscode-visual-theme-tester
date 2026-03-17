export class Calculator {
  private history: number[] = [];

  calculate(a: number, b: number, operation: string): number {
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
      default:
        throw new Error('Invalid operation');
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

  getLastCalculation(): number | undefined {
    return this.history[this.history.length - 1];
  }
}