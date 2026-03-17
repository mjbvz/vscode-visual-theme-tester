// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/split-editor.prompt.md
// prompt-hash: 2ab491769202
// Generated: 2026-03-13T19:24:52.641Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor split
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the TypeScript file first
  await helpers.openFile("src/main.ts");
  await helpers.wait(500);

  // Split the editor to the right
  await helpers.runCommand("View: Split Editor Right");
  await helpers.wait(500);

  // Open the CSS file in the new editor group
  await helpers.openFile("styles/main.css");
  await helpers.wait(500);

  // Take a screenshot showing both files side by side with different syntax highlighting
  await helpers.saveScreenshot("Split editor layout with TypeScript and CSS files showing syntax highlighting contrast");
}
