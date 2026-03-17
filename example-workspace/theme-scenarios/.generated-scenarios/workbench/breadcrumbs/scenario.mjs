// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/breadcrumbs.prompt.md
// prompt-hash: 1cfdc8b92b8c
// Generated: 2026-03-13T19:27:25.967Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on breadcrumbs
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the nested TypeScript file
  await helpers.openFile("src/utils/helpers.ts");
  await helpers.wait(500);

  // Ensure breadcrumbs are enabled
  await helpers.runCommand("View: Toggle Breadcrumbs");
  await helpers.wait(300);

  // Focus the active editor group to ensure we can navigate within the file
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(200);

  // Navigate to the processUserData function inside the DataProcessor class
  // This will show the full breadcrumb path: src > utils > helpers.ts > DataProcessor > processUserData
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("14");
  await helpers.pressKey("Enter");
  await helpers.wait(300);

  // Click in the function to make sure breadcrumbs show the full hierarchy
  await helpers.typeText(""); // Just to place cursor in the function
  await helpers.wait(500);

  // Take screenshot showing the breadcrumb trail
  await helpers.saveScreenshot("Breadcrumb navigation showing full path from folder to function");
}
