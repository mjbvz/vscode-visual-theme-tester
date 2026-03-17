// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/search-panel.prompt.md
// prompt-hash: 407cb6ed74b3
// Generated: 2026-03-13T19:25:26.317Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Open a TypeScript file so the editor isn't empty
  await helpers.openFile('src/utils.ts');
  await helpers.wait(500);
  
  // Hide other panels to focus on the search sidebar
  await helpers.runCommand('View: Close Panel');
  await helpers.wait(300);
  await helpers.runCommand('View: Close Secondary Side Bar');
  await helpers.wait(300);
  
  // Open the Search sidebar
  await helpers.runCommand('View: Show Search');
  await helpers.wait(500);
  
  // Type a search term that will match content in the workspace files
  await helpers.typeText('user');
  await helpers.wait(800);
  
  // Take a screenshot showing the search sidebar with results
  await helpers.saveScreenshot('Search sidebar with search results for "user"');
}
