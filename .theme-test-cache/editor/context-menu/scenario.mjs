// Auto-generated scenario code
// Source: scenarios/editor/context-menu.prompt.md
// prompt-hash: 8c281873af95
// Generated: 2026-03-13T16:19:07.774Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel for focused screenshot
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/utils.ts");
  await helpers.wait(500);
  
  // Position cursor in the middle of the editor
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("15");
  await helpers.pressKey("Enter");
  await helpers.wait(300);
  
  // Focus the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(300);
  
  // Right-click using keyboard shortcut to open context menu
  await helpers.pressKey("Shift+F10");
  
  // Wait for context menu to appear
  await helpers.wait(800);
  
  // Take screenshot showing the context menu
  await helpers.saveScreenshot("Editor context menu opened via keyboard shortcut");
}
