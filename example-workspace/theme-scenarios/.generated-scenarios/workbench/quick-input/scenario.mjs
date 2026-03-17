// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/quick-input.prompt.md
// prompt-hash: 924905ec19c4
// Generated: 2026-03-13T19:25:34.329Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panel to focus on the editor and command palette
    await helpers.runCommand("View: Close Sidebar");
    await helpers.wait(300);
    await helpers.runCommand("View: Close Panel");
    await helpers.wait(300);
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the example file
    await helpers.openFile("src/example.js");
    await helpers.wait(500);

    // Open Command Palette using keyboard shortcut (Cmd+Shift+P on macOS)
    await helpers.pressKey("Meta+Shift+P");
    await helpers.wait(300);

    // Type "format" to filter the commands
    await helpers.typeText("format");
    await helpers.wait(500);

    // Take screenshot showing the Command Palette with filtered results
    await helpers.saveScreenshot("Command Palette showing filtered format commands");
}
