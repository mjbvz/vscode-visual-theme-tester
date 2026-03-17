// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/minimap.prompt.md
// prompt-hash: aeae86571d10
// Generated: 2026-03-13T19:29:49.980Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panel to focus on the editor and minimap
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the TypeScript file
    await helpers.openFile("src/app.ts");
    await helpers.wait(500);

    // Ensure minimap is visible (it should be by default, but let's make sure)
    await helpers.runCommand("View: Toggle Minimap");
    await helpers.wait(300);
    await helpers.runCommand("View: Toggle Minimap");
    await helpers.wait(300);

    // Focus the editor to ensure we can scroll
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(200);

    // Navigate to approximately the middle of the file (around line 80)
    await helpers.runCommand("Go to Line...");
    await helpers.wait(200);
    await helpers.typeText("80");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    // Scroll up a bit to show more context around the middle
    await helpers.pressKey("ArrowUp");
    await helpers.pressKey("ArrowUp");
    await helpers.pressKey("ArrowUp");
    await helpers.wait(200);

    // Take a screenshot showing the editor with minimap
    await helpers.saveScreenshot("TypeScript file with minimap visible");
}
