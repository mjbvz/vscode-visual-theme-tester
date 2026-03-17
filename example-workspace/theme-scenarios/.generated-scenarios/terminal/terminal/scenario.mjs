// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/terminal/terminal.prompt.md
// prompt-hash: 0e3ef02d705b
// Generated: 2026-03-13T19:28:20.589Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide UI panels to focus on editor and terminal
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the source file
    await helpers.openFile("src/utils.js");
    await helpers.wait(500);

    // Open the integrated terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(1000);

    // Run basic commands to generate terminal output
    await helpers.typeText("echo 'Terminal initialized successfully'");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    await helpers.typeText("ls -la");
    await helpers.pressKey("Enter");
    await helpers.wait(500);

    await helpers.typeText("node --version");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    await helpers.typeText("npm --version");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    await helpers.typeText("env | head -10");
    await helpers.pressKey("Enter");
    await helpers.wait(500);

    await helpers.typeText("pwd");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    await helpers.typeText("date");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    // Take screenshot showing editor and terminal together
    await helpers.saveScreenshot("Editor with integrated terminal showing command output");
}
