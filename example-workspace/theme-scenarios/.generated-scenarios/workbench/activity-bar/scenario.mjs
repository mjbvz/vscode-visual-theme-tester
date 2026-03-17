// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/activity-bar.prompt.md
// prompt-hash: d56183cf6c42
// Generated: 2026-03-13T19:27:48.589Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Close secondary sidebar and panel to focus on the activity bar
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open Explorer to ensure the sidebar is visible and activity bar is shown
  await helpers.runCommand("View: Show Explorer");
  await helpers.wait(500);
  
  // Open a TypeScript file to trigger type checking and create Problems badge
  await helpers.openFile("src/main.ts");
  await helpers.wait(1000); // Wait for TypeScript analysis to complete
  
  // Initialize git repository to create Source Control badges
  await helpers.runCommand("View: Toggle Terminal");
  await helpers.wait(300);
  await helpers.typeText("git init", 100);
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  await helpers.typeText("git add .", 100);
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Close terminal to focus on activity bar
  await helpers.runCommand("View: Toggle Terminal");
  await helpers.wait(300);
  
  // Make sure Explorer is focused to show the activity bar clearly
  await helpers.runCommand("View: Show Explorer");
  await helpers.wait(500);
  
  // Take screenshot showing the activity bar with badges
  await helpers.saveScreenshot("Activity bar with Problems badge (errors) and Source Control badge (git changes)");
}
