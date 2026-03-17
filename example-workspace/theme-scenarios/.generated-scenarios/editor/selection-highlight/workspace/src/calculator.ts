interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

class SimpleCalculator implements Calculator {
  private result: number = 0;

  add(a: number, b: number): number {
    this.result = a + b;
    return this.result;
  }

  subtract(a: number, b: number): number {
    this.result = a - b;
    return this.result;
  }

  multiply(a: number, b: number): number {
    this.result = a * b;
    return this.result;
  }

  getResult(): number {
    return this.result;
  }

  reset(): void {
    this.result = 0;
  }
}

const calculator = new SimpleCalculator();
const result = calculator.add(5, 3);
console.log('Result:', result);