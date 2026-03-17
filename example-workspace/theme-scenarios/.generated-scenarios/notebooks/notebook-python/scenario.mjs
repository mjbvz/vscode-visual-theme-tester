// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/notebooks/notebook-python.prompt.md
// prompt-hash: 591a2c6d8a32
// Generated: 2026-03-13T19:28:09.484Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI panels to focus on notebook content
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the Jupyter notebook
  await helpers.openFile("data_analysis.ipynb");
  await helpers.wait(1000); // Wait for notebook to fully load
  
  // Take a screenshot showing the notebook with all cells and outputs
  await helpers.saveScreenshot("Jupyter notebook with Python cells, markdown heading, text output, and table output");
}
