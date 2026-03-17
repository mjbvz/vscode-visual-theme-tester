// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/settings-ui.prompt.md
// prompt-hash: 8fde23b39839
// Generated: 2026-03-13T19:23:54.243Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panels to focus on the settings UI
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the Settings UI
  await helpers.runCommand("Preferences: Open Settings (UI)");
  await helpers.wait(1000); // Wait for settings to load

  // Type "font" in the search box to filter settings
  await helpers.typeText("font");
  await helpers.wait(500); // Wait for search results to filter

  // Take a screenshot showing the filtered settings
  await helpers.saveScreenshot("Settings UI with font search results");
}
