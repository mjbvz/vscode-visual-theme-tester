// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/debug-view.prompt.md
// prompt-hash: bd4ac645bf96
// Generated: 2026-03-13T19:27:14.019Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide UI elements to focus on debug view and editor
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);
    
    // Open the calculator file
    await helpers.openFile("src/calculator.js");
    await helpers.wait(500);
    
    // Show the Run and Debug sidebar
    await helpers.runCommand("View: Show Run and Debug");
    await helpers.wait(500);
    
    // Focus the editor to place cursor and set breakpoint
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(300);
    
    // Navigate to line 3 (inside the add function) to set a breakpoint
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("3");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Set a breakpoint on the current line
    await helpers.runCommand("Debug: Toggle Breakpoint");
    await helpers.wait(500);
    
    // Navigate to line 14 (inside the calculate function) for another breakpoint
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("14");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Set another breakpoint
    await helpers.runCommand("Debug: Toggle Breakpoint");
    await helpers.wait(500);
    
    // Take a screenshot showing the debug sidebar and breakpoints
    await helpers.saveScreenshot("Debug view with sidebar sections and breakpoint markers in editor gutter");
}
