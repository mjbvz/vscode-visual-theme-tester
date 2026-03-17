// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/welcome-tab.prompt.md
// prompt-hash: cea807721932
// Generated: 2026-03-13T19:23:58.564Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI panels to focus on the Welcome tab content
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the Welcome tab
  await helpers.runCommand("Help: Welcome");
  await helpers.wait(500);

  // Take a screenshot of the Welcome tab
  await helpers.saveScreenshot("Welcome tab with themed sections and links");
}
