// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/source-control.prompt.md
// prompt-hash: 7cde594bf767
// Generated: 2026-03-13T19:25:14.089Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Initialize git repository and create initial commit
  await helpers.runCommand("Terminal: Create New Terminal");
  await helpers.wait(1000);
  
  // Initialize git and create initial state
  await helpers.typeText("git init");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  await helpers.typeText("git add package.json index.js");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  await helpers.typeText('git commit -m "Initial commit"');
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Stage README.md (this will be a staged change)
  await helpers.typeText("git add README.md");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Modify index.js to create an unstaged change
  await helpers.typeText("echo '// Modified for testing' >> index.js");
  await helpers.pressKey("Enter");
  await helpers.wait(500);
  
  // Close terminal
  await helpers.runCommand("View: Close Panel");
  await helpers.wait(300);
  
  // Close sidebar and secondary sidebar to focus on source control
  await helpers.runCommand("View: Close Sidebar");
  await helpers.wait(300);
  
  // Open Source Control sidebar
  await helpers.runCommand("View: Show Source Control");
  await helpers.wait(1000);
  
  // Take screenshot showing the Source Control view
  await helpers.saveScreenshot("Source Control view showing staged changes, unstaged changes, and untracked files");
}
