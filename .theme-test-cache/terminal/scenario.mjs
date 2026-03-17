// Auto-generated scenario code
// Source: scenarios/terminal.prompt.md
// prompt-hash: 0e3ef02d705b
// Generated: 2026-03-13T08:26:47.273Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and secondary sidebar to focus on editor and terminal
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);
    
    // Open the source file
    await helpers.openFile("src/app.js");
    await helpers.wait(1000);
    
    // Open the integrated terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(2000); // Wait for terminal to initialize
    
    // Run some basic commands to populate the terminal with output
    
    // First command: echo
    await helpers.typeText("echo 'Terminal Demo - Running Basic Commands'");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Second command: ls -la
    await helpers.typeText("ls -la");
    await helpers.pressKey("Enter");
    await helpers.wait(1000);
    
    // Third command: node version
    await helpers.typeText("node --version");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Fourth command: npm version
    await helpers.typeText("npm --version");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Fifth command: show some environment variables
    await helpers.typeText("env | head -10");
    await helpers.pressKey("Enter");
    await helpers.wait(1000);
    
    // Sixth command: show current directory
    await helpers.typeText("pwd");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Seventh command: show date
    await helpers.typeText("date");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Take screenshot showing editor and terminal together
    await helpers.saveScreenshot("Editor with integrated terminal showing command output");
}
