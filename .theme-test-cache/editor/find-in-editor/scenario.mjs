// Auto-generated scenario code
// Source: scenarios/editor/find-in-editor.prompt.md
// prompt-hash: 477b60e05a4f
// Generated: 2026-03-13T16:14:10.451Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/calculator.ts");
  await helpers.wait(500);
  
  // Focus the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(300);
  
  // Open the Find widget
  await helpers.runCommand("Find");
  await helpers.wait(500);
  
  // Type the search term "calculate" which appears multiple times in the file
  await helpers.typeText("calculate", 50);
  await helpers.wait(1000);
  
  // Take a screenshot showing the find widget with match count and highlighted matches
  await helpers.saveScreenshot("Find widget showing multiple matches for 'calculate' with highlights in editor");
}
