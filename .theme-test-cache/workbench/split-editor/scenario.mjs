// Auto-generated scenario code
// Source: scenarios/workbench/split-editor.prompt.md
// prompt-hash: 2ab491769202
// Generated: 2026-03-13T08:28:35.498Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the editor layout
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open the TypeScript file first
  await helpers.openFile("src/components/Button.tsx");
  await helpers.wait(1000);

  // Split the editor to the right
  await helpers.runCommand("View: Split Editor Right");
  await helpers.wait(1000);

  // Open the CSS file in the new editor group
  await helpers.openFile("src/components/Button.css");
  await helpers.wait(1000);

  // Take a screenshot showing the split editor layout with both files
  await helpers.saveScreenshot("Split editor layout with TypeScript and CSS files side by side");
}
