/**
 * Simple calculator functions for debugging demonstration
 */

function add(a, b) {
    const result = a + b;
    return result;
}

function multiply(a, b) {
    const result = a * b;
    return result;
}

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function main() {
    const x = 5;
    const y = 3;
    
    const sum = add(x, y);
    const product = multiply(x, y);
    const fact = factorial(x);
    
    console.log(`Sum: ${sum}`);
    console.log(`Product: ${product}`);
    console.log(`Factorial of ${x}: ${fact}`);
}

main();