// Auto-generated scenario code
// Source: scenarios/editor/minimap.prompt.md
// prompt-hash: aeae86571d10
// Generated: 2026-03-13T16:13:14.067Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on editor and minimap
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open the TypeScript file
  await helpers.openFile("src/UserService.ts");
  await helpers.wait(1000);

  // Ensure the minimap is visible (it's usually visible by default, but let's be explicit)
  await helpers.runCommand("View: Toggle Minimap");
  await helpers.wait(500);

  // If minimap was already visible, the toggle would hide it, so toggle again to show it
  await helpers.runCommand("View: Toggle Minimap");
  await helpers.wait(500);

  // Navigate to the middle of the file (around line 40-50 of the 80+ line file)
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("45");
  await helpers.pressKey("Enter");
  await helpers.wait(1000);

  // Take a screenshot showing the editor with the minimap
  await helpers.saveScreenshot("TypeScript editor with minimap showing viewport highlight in the middle of file");
}
