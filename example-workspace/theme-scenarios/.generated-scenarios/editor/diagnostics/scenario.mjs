// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/diagnostics.prompt.md
// prompt-hash: 5e3e12c50360
// Generated: 2026-03-13T19:32:26.452Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Close sidebar and panel for focused screenshots
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file with errors
  await helpers.openFile("src/diagnostics-demo.ts");
  
  // Wait for TypeScript language server to analyze the file and show diagnostics
  await helpers.wait(2000);
  
  // Take first screenshot showing editor with error squiggles
  await helpers.saveScreenshot("TypeScript file with diagnostic squiggles - errors and warnings visible");
  
  // Open the Problems panel to show the error list
  await helpers.runCommand("View: Toggle Problems");
  await helpers.wait(500);
  
  // Take second screenshot showing both editor and Problems panel
  await helpers.saveScreenshot("Editor with diagnostic squiggles and Problems panel showing error list");
}
