// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/selection-highlight.prompt.md
// prompt-hash: a78f462077f1
// Generated: 2026-03-13T19:29:07.183Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI elements to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the TypeScript file
  await helpers.openFile("src/calculator.ts");
  await helpers.wait(500);

  // Navigate to line 7 where "result" appears
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("7");
  await helpers.pressKey("Enter");
  await helpers.wait(300);

  // Move to the "result" variable and double-click to select it
  await helpers.pressKey("End");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.pressKey("ArrowLeft");
  await helpers.wait(200);

  // Double-click to select the word "result"
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.pressKey("Shift+ArrowRight");
  await helpers.wait(500);

  // Use "Add Selection To Next Find Match" to add more selections
  await helpers.runCommand("Add Selection To Next Find Match");
  await helpers.wait(300);
  
  await helpers.runCommand("Add Selection To Next Find Match");
  await helpers.wait(300);

  // Take screenshot showing the selection highlighting
  await helpers.saveScreenshot("selection highlighting with multiple occurrences");
}
