// Main application file
console.log('Hello, World!');

function greetUser(name) {
    return `Welcome, ${name}!`;
}

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => {
    console.log(greetUser(user));
});

// Simple color utility functions
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

function colorText(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

module.exports = { greetUser, colorText };