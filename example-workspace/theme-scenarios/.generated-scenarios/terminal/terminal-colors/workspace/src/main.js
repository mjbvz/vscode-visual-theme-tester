// Terminal Colors Demo
// This file demonstrates various terminal color outputs

function printColoredText() {
    console.log('Welcome to the terminal colors demo!');
    console.log('This script will show various ANSI color codes.');
    
    // Basic colors
    const colors = {
        red: '\033[31m',
        green: '\033[32m', 
        yellow: '\033[33m',
        blue: '\033[34m',
        magenta: '\033[35m',
        cyan: '\033[36m',
        white: '\033[37m',
        reset: '\033[0m'
    };
    
    // Print colored output
    Object.entries(colors).forEach(([name, code]) => {
        if (name !== 'reset') {
            console.log(`${code}This is ${name} text${colors.reset}`);
        }
    });
}

printColoredText();