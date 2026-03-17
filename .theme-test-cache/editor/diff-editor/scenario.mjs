// Auto-generated scenario code
// Source: scenarios/editor/diff-editor.prompt.md
// prompt-hash: ad08150babb1
// Generated: 2026-03-13T16:18:37.333Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on the diff editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the first version of the file
  await helpers.openFile("user-service-v1.ts");
  await helpers.wait(500);
  
  // Open the diff editor by comparing with the second version
  await helpers.runCommand("File: Compare Active File With...");
  await helpers.wait(1000);
  
  // Type the path to the second file
  await helpers.typeText("user-service-v2.ts");
  await helpers.pressKey("Enter");
  await helpers.wait(2000);
  
  // Take a screenshot of the diff editor showing the changes
  await helpers.saveScreenshot("Side-by-side diff editor showing TypeScript file changes with additions (green), deletions (red), and modifications");
  
  // Wait a moment to ensure the diff is fully rendered
  await helpers.wait(1000);
}
