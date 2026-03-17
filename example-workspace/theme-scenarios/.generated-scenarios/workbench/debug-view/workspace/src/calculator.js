// Simple calculator functions
function add(a, b) {
    const result = a + b;
    console.log(`Adding ${a} + ${b} = ${result}`);
    return result;
}

function multiply(a, b) {
    const result = a * b;
    console.log(`Multiplying ${a} * ${b} = ${result}`);
    return result;
}

function calculate() {
    const x = 5;
    const y = 3;
    
    const sum = add(x, y);
    const product = multiply(x, y);
    
    console.log(`Final results: sum=${sum}, product=${product}`);
    return { sum, product };
}

// Run the calculation
calculate();