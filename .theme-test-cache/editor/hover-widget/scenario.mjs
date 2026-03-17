// Auto-generated scenario code
// Source: scenarios/editor/hover-widget.prompt.md
// prompt-hash: 3429469263f0
// Generated: 2026-03-13T16:13:27.757Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/utils.ts");
  await helpers.wait(500);
  
  // Navigate to line 29 where calculateArea function call is located
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("29");
  await helpers.pressKey("Enter");
  await helpers.wait(300);
  
  // Position cursor on the function name "calculateArea"
  await helpers.pressKey("End");
  await helpers.pressKey("Home");
  // Move to the "calculateArea" function call
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  await helpers.pressKey("ArrowRight");
  
  // Show hover information
  await helpers.runCommand("Show Hover");
  await helpers.wait(1000);
  
  // Take a screenshot showing the hover widget
  await helpers.saveScreenshot("Hover widget showing function documentation and type information");
}
