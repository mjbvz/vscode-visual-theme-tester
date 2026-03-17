// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/git-gutter.prompt.md
// prompt-hash: e721b9857a32
// Generated: 2026-03-13T19:30:27.403Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide UI elements to focus on the editor
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);

    // Initialize git repository and make initial commit
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(500);
    
    // Initialize git and commit the original file
    await helpers.typeText("git init", 50);
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    await helpers.typeText("git add .", 50);
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    await helpers.typeText('git commit -m "Initial commit"', 50);
    await helpers.pressKey("Enter");
    await helpers.wait(500);

    // Close terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(300);

    // Open the TypeScript file
    await helpers.openFile("src/calculator.ts");
    await helpers.wait(500);

    // Make modifications to show different git gutter indicators
    
    // 1. Add new lines at the beginning (green gutter)
    await helpers.pressKey("Home");
    await helpers.typeText("// Enhanced Calculator with advanced features\n", 50);
    await helpers.typeText("// Supports history tracking and error handling\n\n", 50);
    
    // 2. Modify existing line (blue gutter) - change the class name
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("4");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Select "Calculator" and replace it
    await helpers.pressKey("End");
    await helpers.pressKey("Home");
    await helpers.typeText("export class AdvancedCalculator {", 50);
    await helpers.pressKey("ArrowDown");
    await helpers.pressKey("Home");
    // Delete the entire history line to show red triangle
    await helpers.pressKey("End");
    await helpers.pressKey("ArrowDown");
    await helpers.pressKey("Home");
    
    // 3. Delete some lines (red triangle)
    // Go to the subtract method and delete it entirely
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("12");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Select and delete the entire subtract method (lines 12-16)
    await helpers.pressKey("Home");
    for (let i = 0; i < 5; i++) {
        await helpers.pressKey("ArrowDown");
        await helpers.pressKey("Home");
        await helpers.pressKey("End");
        await helpers.pressKey("ArrowDown");
    }
    // Delete the selected lines
    for (let i = 0; i < 5; i++) {
        await helpers.pressKey("ArrowUp");
    }
    await helpers.pressKey("Home");
    for (let i = 0; i < 5; i++) {
        await helpers.runCommand("Select All");
        await helpers.pressKey("ArrowDown");
        await helpers.pressKey("Home");
        await helpers.pressKey("End");
        await helpers.pressKey("ArrowDown");
        await helpers.pressKey("ArrowUp");
        await helpers.pressKey("ArrowUp");
        await helpers.pressKey("ArrowUp");
        await helpers.pressKey("ArrowUp");
        await helpers.pressKey("ArrowUp");
    }
    
    // Simpler approach - just delete lines manually
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("12");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Delete the subtract method by selecting multiple lines
    await helpers.pressKey("Home");
    // Select 5 lines for the subtract method
    for (let i = 0; i < 5; i++) {
        await helpers.pressKey("End");
        await helpers.pressKey("ArrowDown");
    }
    await helpers.pressKey("ArrowUp");
    await helpers.pressKey("Home");
    // Now delete these lines
    await helpers.pressKey("Backspace");
    await helpers.pressKey("Backspace");
    await helpers.pressKey("Backspace");
    await helpers.pressKey("Backspace");
    await helpers.pressKey("Backspace");
    
    // Add a new method at the end (more green gutter)
    await helpers.pressKey("End");
    await helpers.typeText("\n\n    // New method added\n    power(base: number, exponent: number): number {\n        const result = Math.pow(base, exponent);\n        this.history.push(result);\n        return result;\n    }", 50);
    
    await helpers.wait(1000);

    // Take screenshot showing the git gutter indicators
    await helpers.saveScreenshot("TypeScript file with git gutter indicators showing added lines (green), modified lines (blue), and deleted lines (red triangle)");
}
