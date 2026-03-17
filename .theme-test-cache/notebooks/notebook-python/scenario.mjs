// Auto-generated scenario code
// Source: scenarios/notebooks/notebook-python.prompt.md
// prompt-hash: 591a2c6d8a32
// Generated: 2026-03-13T16:19:51.439Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Close unnecessary panels to focus on the notebook
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open the Jupyter notebook
  await helpers.openFile("notebook.ipynb");
  await helpers.wait(1500); // Wait for notebook to load and render

  // Take a screenshot showing the notebook with all cells and outputs
  await helpers.saveScreenshot("Jupyter notebook with Python cells, markdown heading, text output, and table data");
}
