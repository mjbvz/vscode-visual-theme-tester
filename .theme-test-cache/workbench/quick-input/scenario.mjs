// Auto-generated scenario code
// Source: scenarios/workbench/quick-input.prompt.md
// prompt-hash: 924905ec19c4
// Generated: 2026-03-13T08:29:32.536Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panels to focus on the editor and command palette
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);
    
    // Open the example JavaScript file
    await helpers.openFile("src/example.js");
    await helpers.wait(500);
    
    // Open Command Palette using keyboard shortcut (Cmd+Shift+P on macOS)
    await helpers.pressKey("Meta+Shift+P");
    await helpers.wait(500);
    
    // Type "format" to filter commands - do NOT press Enter
    await helpers.typeText("format");
    await helpers.wait(500);
    
    // Take screenshot showing the Command Palette with filtered "format" results
    await helpers.saveScreenshot("Command Palette showing filtered format commands");
}
