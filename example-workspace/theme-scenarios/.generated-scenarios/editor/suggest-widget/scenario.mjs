// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/suggest-widget.prompt.md
// prompt-hash: 462cbcf5a93a
// Generated: 2026-03-13T19:28:54.874Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);
  
  // Open the TypeScript file
  await helpers.openFile("src/main.ts");
  await helpers.wait(500);
  
  // Navigate to the end of the file where the cursor should be positioned after "processor."
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("18");
  await helpers.pressKey("Enter");
  await helpers.wait(300);
  
  // Move to the end of the line (after the dot)
  await helpers.pressKey("End");
  await helpers.wait(300);
  
  // Trigger the suggest widget
  await helpers.runCommand("Trigger Suggest");
  await helpers.wait(800);
  
  // Take a screenshot showing the autocomplete dropdown
  await helpers.saveScreenshot("TypeScript autocomplete suggestions for DataProcessor methods");
}
