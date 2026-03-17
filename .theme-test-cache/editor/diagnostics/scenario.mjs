// Auto-generated scenario code
// Source: scenarios/editor/diagnostics.prompt.md
// prompt-hash: 5e3e12c50360
// Generated: 2026-03-13T16:18:56.406Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI panels to focus on the editor and diagnostics
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the main TypeScript file with errors
  await helpers.openFile("src/main.ts");
  await helpers.wait(1000);
  
  // Focus on the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(1500); // Wait for TypeScript diagnostics to load
  
  // Take first screenshot showing editor with error squiggles
  await helpers.saveScreenshot("TypeScript file with red and yellow diagnostic squiggles");
  
  // Open the Problems panel to show the error list
  await helpers.runCommand("View: Toggle Problems");
  await helpers.wait(1000); // Wait for Problems panel to open and populate
  
  // Take second screenshot showing both editor and Problems panel
  await helpers.saveScreenshot("Editor with diagnostics and Problems panel showing error list");
}
