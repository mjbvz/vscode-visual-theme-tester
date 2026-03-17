// Auto-generated scenario code
// Source: scenarios/workbench/debug-view.prompt.md
// prompt-hash: bd4ac645bf96
// Generated: 2026-03-13T16:31:39.600Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Close sidebar and panel to focus on the debug view
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.wait(300);
    
    // Open the calculator.js file
    await helpers.openFile("calculator.js");
    await helpers.wait(500);
    
    // Show the Run and Debug sidebar
    await helpers.runCommand("View: Show Run and Debug");
    await helpers.wait(500);
    
    // Navigate to line 17 (inside the main function where we'll set a breakpoint)
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("17");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Focus the editor to ensure we can interact with it
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(300);
    
    // Set a breakpoint on the current line
    await helpers.runCommand("Debug: Toggle Breakpoint");
    await helpers.wait(500);
    
    // Take a screenshot showing the debug sidebar and breakpoint
    await helpers.saveScreenshot("Debug view with sidebar sections and breakpoint marker");
}
