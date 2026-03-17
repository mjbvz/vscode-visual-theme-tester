// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/editor/editor-languages.prompt.md
// prompt-hash: 8556acaa2c40
// Generated: 2026-03-13T19:31:54.980Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Keep the sidebar visible and close other panels
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open TypeScript file
  await helpers.openFile("src/user.ts");
  await helpers.wait(500);
  await helpers.saveScreenshot("TypeScript file with interfaces, classes, and async methods");

  // Open Python file  
  await helpers.openFile("src/data_processor.py");
  await helpers.wait(500);
  await helpers.saveScreenshot("Python file with class definitions, type hints, and pandas operations");

  // Open Rust file
  await helpers.openFile("src/config.rs");
  await helpers.wait(500);
  await helpers.saveScreenshot("Rust file with structs, traits, and error handling");

  // Open Go file
  await helpers.openFile("src/server.go");
  await helpers.wait(500);
  await helpers.saveScreenshot("Go file with HTTP server, JSON handling, and gorilla mux routing");

  // Open HTML file
  await helpers.openFile("src/dashboard.html");
  await helpers.wait(500);
  await helpers.saveScreenshot("HTML file with embedded CSS, modern styling, and dashboard layout");

  // Open CSS file
  await helpers.openFile("src/styles.css");
  await helpers.wait(500);
  await helpers.saveScreenshot("CSS file with Grid layout, custom properties, animations, and responsive design");

  // Open JSON file
  await helpers.openFile("config/settings.json");
  await helpers.wait(500);
  await helpers.saveScreenshot("JSON configuration file with nested objects and application settings");

  // Open Markdown file
  await helpers.openFile("README.md");
  await helpers.wait(500);
  await helpers.saveScreenshot("Markdown file with headers, code blocks, tables, and project documentation");
}
