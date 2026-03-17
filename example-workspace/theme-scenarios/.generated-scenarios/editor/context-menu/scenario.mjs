// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/context-menu.prompt.md
// prompt-hash: 8c281873af95
// Generated: 2026-03-13T19:32:34.503Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/example.ts");
  await helpers.wait(500);
  
  // Focus the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(300);
  
  // Navigate to the middle of the file
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("12");
  await helpers.pressKey("Enter");
  await helpers.wait(300);
  
  // Right-click in the editor using keyboard shortcut
  await helpers.pressKey("Shift+F10");
  await helpers.wait(500);
  
  // Take a screenshot showing the context menu
  await helpers.saveScreenshot("Editor context menu open");
}
