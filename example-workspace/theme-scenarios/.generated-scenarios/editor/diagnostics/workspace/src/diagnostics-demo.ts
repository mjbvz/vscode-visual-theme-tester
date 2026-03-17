// TypeScript file with intentional errors for diagnostics demo

// Missing import - should cause error
const express = require('express');

// Unused variable - should cause warning
const unusedVariable = 'this is never used';

// Type mismatch errors
function calculateSum(a: number, b: number): number {
    return a + b;
}

// Calling with wrong types
const result1 = calculateSum("hello", "world");
const result2 = calculateSum(5, "string");

// Accessing property that doesn't exist
const user = { name: "John", age: 30 };
console.log(user.email); // email property doesn't exist

// Undefined variable
console.log(someUndefinedVariable);

// Function with missing return statement
function getMissingReturn(): string {
    const value = "test";
    // Missing return statement
}

// Array type mismatch
const numbers: number[] = [1, 2, 3, "four", 5];

export { calculateSum };