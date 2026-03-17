// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/bracket-pairs.prompt.md
// prompt-hash: 80ed72e9da69
// Generated: 2026-03-13T19:32:46.692Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the TypeScript file with nested brackets
  await helpers.openFile("src/nested-brackets.ts");
  await helpers.wait(500);

  // Navigate to show the most complex nested section
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("15");
  await helpers.pressKey("Enter");
  await helpers.wait(300);

  // Focus the editor to ensure bracket guides are visible
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(300);

  // Take a screenshot showing bracket pair colorization and guides
  await helpers.saveScreenshot("TypeScript editor showing colorized bracket pairs and bracket pair guides");
}
