// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/hover-widget.prompt.md
// prompt-hash: 3429469263f0
// Generated: 2026-03-13T19:30:03.049Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI elements to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the TypeScript file
  await helpers.openFile("src/utils.ts");
  await helpers.wait(500);

  // Navigate to the line with function calls and position cursor on calculateArea function call
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("29");
  await helpers.pressKey("Enter");
  await helpers.wait(300);

  // Move cursor to the beginning of the function call
  await helpers.pressKey("End");
  await helpers.typeText(" ");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  
  // Show hover information
  await helpers.runCommand("Show Hover");
  await helpers.wait(800);

  // Take screenshot showing the hover widget
  await helpers.saveScreenshot("Hover widget showing JSDoc information for calculateArea function");
}
