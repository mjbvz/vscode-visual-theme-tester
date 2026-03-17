// Auto-generated scenario code
// Source: scenarios/terminal/terminal.prompt.md
// prompt-hash: 0e3ef02d705b
// Generated: 2026-03-13T16:20:06.729Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and secondary sidebar to focus on editor and terminal
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);
    
    // Open the main source file
    await helpers.openFile("src/main.js");
    await helpers.wait(1000);
    
    // Open the integrated terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(1500); // Wait for terminal to initialize
    
    // Run a series of safe commands to populate the terminal with output
    
    // Echo command
    await helpers.typeText("echo 'Welcome to VS Code Terminal Demo'");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // List directory contents with details
    await helpers.typeText("ls -la");
    await helpers.pressKey("Enter");
    await helpers.wait(800);
    
    // Show Node.js version
    await helpers.typeText("node --version");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Show npm version
    await helpers.typeText("npm --version");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Show current working directory
    await helpers.typeText("pwd");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Show first 10 environment variables
    await helpers.typeText("env | head -10");
    await helpers.pressKey("Enter");
    await helpers.wait(800);
    
    // Show current date and time
    await helpers.typeText("date");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Show who is logged in
    await helpers.typeText("whoami");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Take a screenshot showing both the editor and terminal panel
    await helpers.saveScreenshot("Editor with integrated terminal showing command output");
}
