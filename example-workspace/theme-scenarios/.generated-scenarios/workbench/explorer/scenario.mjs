// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/explorer.prompt.md
// prompt-hash: 4c3539318d11
// Generated: 2026-03-13T19:27:02.361Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Close sidebar, panel, and secondary sidebar to focus on the explorer view
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the Explorer sidebar (it should be visible by default, but ensure it's open)
  await helpers.runCommand("View: Show Explorer");
  await helpers.wait(500);
  
  // Open a file in the editor to show both explorer and editor
  await helpers.openFile("src/main.ts");
  await helpers.wait(300);
  
  // Expand folders in the Explorer to show the tree structure
  // We'll use keyboard navigation to expand folders
  
  // Click on the Explorer to focus it
  await helpers.runCommand("View: Focus on Explorer View");
  await helpers.wait(300);
  
  // Expand src folder (should be collapsed initially)
  await helpers.pressKey("ArrowDown"); // Navigate to src
  await helpers.pressKey("ArrowRight"); // Expand src folder
  await helpers.wait(200);
  
  // Navigate and expand routes folder
  await helpers.pressKey("ArrowDown"); // Navigate down in src
  await helpers.pressKey("ArrowDown"); // Navigate to routes
  await helpers.pressKey("ArrowRight"); // Expand routes folder
  await helpers.wait(200);
  
  // Navigate and expand services folder
  await helpers.pressKey("ArrowDown"); // Navigate down
  await helpers.pressKey("ArrowDown"); // Navigate to services
  await helpers.pressKey("ArrowRight"); // Expand services folder
  await helpers.wait(200);
  
  // Navigate and expand types folder
  await helpers.pressKey("ArrowDown"); // Navigate down
  await helpers.pressKey("ArrowDown"); // Navigate to types
  await helpers.pressKey("ArrowRight"); // Expand types folder
  await helpers.wait(200);
  
  // Navigate and expand utils folder
  await helpers.pressKey("ArrowDown"); // Navigate down
  await helpers.pressKey("ArrowDown"); // Navigate to utils
  await helpers.pressKey("ArrowRight"); // Expand utils folder
  await helpers.wait(200);
  
  // Navigate and expand tests folder
  await helpers.pressKey("ArrowUp"); // Navigate up to get out of src
  await helpers.pressKey("ArrowUp");
  await helpers.pressKey("ArrowUp");
  await helpers.pressKey("ArrowUp");
  await helpers.pressKey("ArrowUp");
  await helpers.pressKey("ArrowUp");
  await helpers.pressKey("ArrowDown"); // Navigate to tests folder
  await helpers.pressKey("ArrowRight"); // Expand tests folder
  await helpers.wait(200);
  
  // Navigate and expand config folder
  await helpers.pressKey("ArrowUp"); // Navigate up to get out of tests
  await helpers.pressKey("ArrowUp"); // Navigate to config
  await helpers.pressKey("ArrowRight"); // Expand config folder
  await helpers.wait(200);
  
  // Navigate and expand docs folder
  await helpers.pressKey("ArrowUp"); // Navigate up to get out of config
  await helpers.pressKey("ArrowUp"); // Navigate to docs
  await helpers.pressKey("ArrowRight"); // Expand docs folder
  await helpers.wait(200);
  
  // Navigate and expand public folder
  await helpers.pressKey("ArrowDown"); // Navigate down to public
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight"); // Expand public folder
  await helpers.wait(200);
  
  // Take a screenshot showing the expanded Explorer tree with file icons
  await helpers.saveScreenshot("Explorer sidebar with expanded folder structure and file icons");
}
