// Simple Node.js application
const fs = require('fs');
const path = require('path');

function greetUser(name) {
    return `Hello, ${name}! Welcome to our application.`;
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

function logMessage(message) {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] ${message}`);
}

// Main application logic
const userName = process.env.USER || 'Developer';
const greeting = greetUser(userName);

logMessage(greeting);
logMessage('Application started successfully');

// Export functions for testing
module.exports = {
    greetUser,
    getCurrentTimestamp,
    logMessage
};