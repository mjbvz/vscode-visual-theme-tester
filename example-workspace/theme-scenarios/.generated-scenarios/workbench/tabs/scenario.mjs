// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/tabs.prompt.md
// prompt-hash: d57ac96e29e4
// Generated: 2026-03-13T19:24:38.493Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel for cleaner tab view
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open multiple files to fill the tab bar
  await helpers.openFile("src/app.ts");
  await helpers.wait(200);
  
  await helpers.openFile("package.json");
  await helpers.wait(200);
  
  await helpers.openFile("README.md");
  await helpers.wait(200);
  
  await helpers.openFile("styles/main.css");
  await helpers.wait(200);
  
  await helpers.openFile("templates/index.html");
  await helpers.wait(200);
  
  await helpers.openFile("utils/helpers.py");
  await helpers.wait(200);
  
  await helpers.openFile("src/components.ts");
  await helpers.wait(200);
  
  await helpers.openFile("config/settings.json");
  await helpers.wait(300);

  // Make one file modified but unsaved - edit the CSS file
  await helpers.openFile("styles/main.css");
  await helpers.wait(200);
  
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(200);
  
  // Go to end of file and add some content
  await helpers.pressKey("End");
  await helpers.typeText("\n\n/* New styles added */\n.modified-content {\n  color: red;\n}");
  await helpers.wait(300);

  // Create a preview tab by opening the explorer and single-clicking a file
  // First show the sidebar to access explorer
  await helpers.runCommand("View: Show Explorer");
  await helpers.wait(500);
  
  // Click on package.json in explorer to create preview tab
  // Since we can't actually click, we'll simulate by opening it as preview
  await helpers.openFile("package.json");
  await helpers.wait(300);
  
  // Now switch back to a different active tab to show the preview state
  await helpers.openFile("src/app.ts");
  await helpers.wait(300);
  
  // Hide sidebar again for the final screenshot
  await helpers.runCommand("View: Close Sidebar");
  await helpers.wait(300);

  // Take screenshot showing the tab bar with different tab states:
  // - Active tab (app.ts)
  // - Modified unsaved tab (main.css with dot indicator)
  // - Preview tab (package.json in italics)
  // - Multiple inactive tabs
  await helpers.saveScreenshot("Tab bar showing active, inactive, preview, and modified tab states");
}
