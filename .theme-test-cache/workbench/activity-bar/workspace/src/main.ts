// TypeScript file with intentional errors to create Problems badge
export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    // Error: missing return type annotation
    subtract(a, b) {
        return a - b;
    }

    // Error: using undeclared variable
    multiply(a: number, b: number): number {
        return a * b + undeclaredVar;
    }

    // Error: unreachable code
    divide(a: number, b: number): number {
        return a / b;
        console.log("This will never run");
    }
}

// Error: unused variable
const unusedVariable = "this is not used";