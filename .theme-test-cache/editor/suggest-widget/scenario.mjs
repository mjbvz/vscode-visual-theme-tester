// Auto-generated scenario code
// Source: scenarios/editor/suggest-widget.prompt.md
// prompt-hash: 462cbcf5a93a
// Generated: 2026-03-13T16:12:07.484Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI elements to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/main.ts");
  await helpers.wait(1000);
  
  // Focus on the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(500);
  
  // Navigate to the end of the file where the cursor should be positioned after the dot
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("17");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Move to the end of the line (after the dot)
  await helpers.pressKey("End");
  await helpers.wait(500);
  
  // Trigger the suggest widget to show autocomplete options
  await helpers.runCommand("Trigger Suggest");
  await helpers.wait(1000);
  
  // Take a screenshot showing the suggest widget with autocomplete dropdown
  await helpers.saveScreenshot("TypeScript autocomplete suggest widget showing available methods");
}
