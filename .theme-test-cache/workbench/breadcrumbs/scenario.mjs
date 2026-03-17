// Auto-generated scenario code
// Source: scenarios/workbench/breadcrumbs.prompt.md
// prompt-hash: 1cfdc8b92b8c
// Generated: 2026-03-13T16:31:52.895Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide UI elements to focus on the breadcrumbs
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the TypeScript file
    await helpers.openFile("src/utils/helpers.ts");
    await helpers.wait(500);

    // Enable breadcrumbs if not already enabled
    await helpers.runCommand("View: Toggle Breadcrumbs");
    await helpers.wait(300);

    // Focus the active editor group to ensure we can interact with the file
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(300);

    // Navigate to line 30 where the chunk function is located
    await helpers.runCommand("Go to Line...");
    await helpers.wait(200);
    await helpers.typeText("30");
    await helpers.pressKey("Enter");
    await helpers.wait(300);

    // Click on the function name to focus it and update breadcrumbs
    await helpers.pressKey("End");
    await helpers.wait(200);

    // Move cursor to be inside the chunk function
    await helpers.pressKey("ArrowDown");
    await helpers.pressKey("ArrowDown");
    await helpers.wait(300);

    // Take a screenshot showing the breadcrumb trail
    await helpers.saveScreenshot("Breadcrumbs showing path: src > utils > helpers.ts > ArrayUtils > chunk");
}
