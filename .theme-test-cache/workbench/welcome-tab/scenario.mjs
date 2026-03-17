// Auto-generated scenario code
// Source: scenarios/workbench/welcome-tab.prompt.md
// prompt-hash: cea807721932
// Generated: 2026-03-13T08:26:55.455Z
// Model: claude-sonnet-4-20250514

export default async function scenario(helpers) {
  // Hide sidebar and panel to focus on the Welcome tab
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open the Welcome tab
  await helpers.runCommand("Help: Welcome");
  await helpers.wait(1000);

  // Take a screenshot of the Welcome tab content
  await helpers.saveScreenshot("Welcome tab showing themed sections and links");
}
