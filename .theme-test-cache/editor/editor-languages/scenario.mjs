// Auto-generated scenario code
// Source: scenarios/editor/editor-languages.prompt.md
// prompt-hash: 8556acaa2c40
// Generated: 2026-03-13T16:18:15.225Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // List of files to open and screenshot
  const files = [
    { path: 'src/user-service.ts', description: 'TypeScript user service with interfaces and error handling' },
    { path: 'scripts/data_analysis.py', description: 'Python data analysis script with asyncio and pandas' },
    { path: 'src/web_server.rs', description: 'Rust web server using Axum with async handlers' },
    { path: 'cmd/server/main.go', description: 'Go web server with Gorilla Mux and WebSocket support' },
    { path: 'public/dashboard.html', description: 'HTML dashboard with embedded CSS and JavaScript' },
    { path: 'styles/components.css', description: 'Modern CSS component library with custom properties' },
    { path: 'data/config.json', description: 'JSON configuration file with nested application settings' },
    { path: 'README.md', description: 'Markdown documentation with comprehensive project details' }
  ];

  // Close panel and secondary sidebar to focus on editor, but keep the main sidebar visible
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(500);

  // Open each file and take a screenshot
  for (const file of files) {
    await helpers.openFile(file.path);
    await helpers.wait(800); // Wait for file to load and syntax highlighting to apply
    
    await helpers.saveScreenshot(file.description);
    await helpers.wait(300);
  }
}
