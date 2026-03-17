// Auto-generated scenario code
// Source: scenarios/editor/bracket-pairs.prompt.md
// prompt-hash: 80ed72e9da69
// Generated: 2026-03-13T16:19:28.140Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file with nested brackets
  await helpers.openFile("src/nested-brackets.ts");
  await helpers.wait(1000);
  
  // Focus the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(500);
  
  // Navigate to a section with deeply nested brackets to show colorization
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("25");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Take a screenshot showing the bracket pair colorization and guides
  await helpers.saveScreenshot("TypeScript editor showing colorized bracket pairs and bracket pair guides with deeply nested structures");
}
