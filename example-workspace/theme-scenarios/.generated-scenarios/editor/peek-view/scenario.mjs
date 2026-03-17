// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/peek-view.prompt.md
// prompt-hash: e1a1183170fb
// Generated: 2026-03-13T19:29:23.784Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panels for cleaner screenshot
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the main TypeScript file
    await helpers.openFile("src/main.ts");
    await helpers.wait(500);

    // Navigate to line 19 where calculateArea is called
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("19");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    // Position cursor on the calculateArea function call
    // Move to the beginning of the line and then to the function name
    await helpers.pressKey("Home");
    await helpers.wait(100);
    // Move right to position on "calculateArea"
    for (let i = 0; i < 25; i++) {
        await helpers.pressKey("ArrowRight");
        await helpers.wait(10);
    }

    // Focus the editor to ensure we can run commands
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(200);

    // Run Peek Definition command
    await helpers.runCommand("Peek Definition");
    await helpers.wait(1000);

    // Take screenshot showing the peek view with definition
    await helpers.saveScreenshot("Peek definition view showing calculateArea function inline");
}
