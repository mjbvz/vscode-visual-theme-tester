// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/diff-editor.prompt.md
// prompt-hash: ad08150babb1
// Generated: 2026-03-13T19:32:12.225Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel for cleaner diff view
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the first file (old version)
  await helpers.openFile("user-service-old.ts");
  await helpers.wait(500);

  // Open diff editor by comparing with the new version
  await helpers.runCommand("File: Compare Active File With...");
  await helpers.wait(500);

  // Type the name of the new file to compare with
  await helpers.typeText("user-service-new.ts");
  await helpers.wait(300);
  await helpers.pressKey("Enter");
  await helpers.wait(1000);

  // Take screenshot of the diff editor showing additions, deletions, and modifications
  await helpers.saveScreenshot("Side-by-side diff editor showing TypeScript file changes with green additions, red deletions, and modifications");
}
