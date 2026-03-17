// Auto-generated scenario code
// Source: scenarios/workbench/search-panel.prompt.md
// prompt-hash: 407cb6ed74b3
// Generated: 2026-03-13T08:29:23.103Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Open a TypeScript file so the editor isn't empty
  await helpers.openFile('src/app.ts');
  await helpers.wait(500);

  // Hide sidebar, panel, and secondary sidebar to focus on the search functionality
  await helpers.runCommand('View: Close Sidebar');
  await helpers.wait(200);
  await helpers.runCommand('View: Close Panel');
  await helpers.wait(200);
  await helpers.runCommand('View: Close Secondary Side Bar');
  await helpers.wait(500);

  // Open the Search sidebar
  await helpers.runCommand('View: Show Search');
  await helpers.wait(1000);

  // Type a search term that will match content in the workspace files
  await helpers.typeText('validateEmail');
  await helpers.wait(1500);

  // Take a screenshot showing the search sidebar with results
  await helpers.saveScreenshot('Search sidebar showing results for validateEmail');
}
