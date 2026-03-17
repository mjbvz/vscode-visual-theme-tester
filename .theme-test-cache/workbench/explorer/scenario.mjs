// Auto-generated scenario code
// Source: scenarios/workbench/explorer.prompt.md
// prompt-hash: 4c3539318d11
// Generated: 2026-03-13T16:31:29.109Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Close panel and secondary sidebar to focus on explorer
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open a file in the editor first
  await helpers.openFile("src/index.ts");
  await helpers.wait(500);

  // Make sure the Explorer sidebar is open and focused
  await helpers.runCommand("Explorer: Focus on Files Explorer");
  await helpers.wait(500);

  // Expand the src folder
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate down and expand app folder
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate back up and down to services folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to utils folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to styles folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to tests folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Expand services subfolder in tests
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to config folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to docs folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(300);

  // Navigate to public folder and expand it
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowDown");
  await helpers.pressKey("ArrowRight");
  await helpers.wait(500);

  // Take screenshot showing the expanded Explorer tree with file icons
  await helpers.saveScreenshot("Explorer tree with expanded folders showing nested structure and file icons");
}
