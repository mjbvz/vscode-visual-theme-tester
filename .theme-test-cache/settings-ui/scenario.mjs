// Auto-generated scenario code
// Source: scenarios/settings-ui.prompt.md
// prompt-hash: 8fde23b39839
// Generated: 2026-03-13T08:26:51.701Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI elements to focus on the settings
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the Settings UI
  await helpers.runCommand("Preferences: Open Settings (UI)");
  
  // Wait for the Settings UI to load
  await helpers.wait(1000);
  
  // Type "font" in the search box to filter settings
  await helpers.typeText("font");
  
  // Wait for the search results to appear
  await helpers.wait(500);
  
  // Take a screenshot showing the filtered font settings
  await helpers.saveScreenshot("Settings UI showing font-related settings after search filter");
}
