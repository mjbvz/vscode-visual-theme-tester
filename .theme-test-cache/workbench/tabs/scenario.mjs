// Auto-generated scenario code
// Source: scenarios/workbench/tabs.prompt.md
// prompt-hash: d57ac96e29e4
// Generated: 2026-03-13T08:28:18.975Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panels to focus on the tab bar
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open the first file (will become active)
  await helpers.openFile("src/app.ts");
  await helpers.wait(300);

  // Open more files to fill the tab bar
  await helpers.openFile("package.json");
  await helpers.wait(300);

  await helpers.openFile("README.md");
  await helpers.wait(300);

  await helpers.openFile("styles/main.css");
  await helpers.wait(300);

  await helpers.openFile("public/index.html");
  await helpers.wait(300);

  await helpers.openFile("scripts/data_processing.py");
  await helpers.wait(300);

  await helpers.openFile("config/database.json");
  await helpers.wait(300);

  await helpers.openFile("src/types.ts");
  await helpers.wait(500);

  // Make one file modified but unsaved
  await helpers.openFile("src/app.ts");
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(200);
  
  // Go to the end of the file and add some content
  await helpers.pressKey("Meta+End");
  await helpers.wait(200);
  await helpers.pressKey("Enter");
  await helpers.typeText("// TODO: Add error handling middleware");
  await helpers.wait(500);

  // Create a preview tab by single-clicking a file in the explorer
  // First open the explorer
  await helpers.runCommand("View: Show Explorer");
  await helpers.wait(500);

  // Click on a different file to make it preview (single click)
  // We'll simulate this by opening a file and then quickly opening another
  await helpers.openFile("config/database.json");
  await helpers.wait(200);
  
  // Open another file to make the previous one a preview tab
  await helpers.openFile("package.json");
  await helpers.wait(500);

  // Make sure we have a good active tab
  await helpers.openFile("README.md");
  await helpers.wait(500);

  // Close the explorer to show just the tabs and editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.wait(500);

  // Take the screenshot showing the tab bar with different tab states
  await helpers.saveScreenshot("Tab bar showing active, inactive, preview, and modified tabs with editor content");
}
