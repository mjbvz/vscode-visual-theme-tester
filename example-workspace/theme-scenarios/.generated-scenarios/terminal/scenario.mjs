// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/terminal.prompt.md
// prompt-hash: 0e3ef02d705b
// Generated: 2026-03-13T19:23:49.602Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Open the source file
    await helpers.openFile('src/main.js');
    await helpers.wait(500);
    
    // Hide sidebar and secondary sidebar to focus on editor and terminal
    await helpers.runCommand('View: Close Sidebar');
    await helpers.wait(300);
    await helpers.runCommand('View: Close Secondary Side Bar');
    await helpers.wait(300);
    
    // Open the integrated terminal
    await helpers.runCommand('View: Toggle Terminal');
    await helpers.wait(1000); // Wait for terminal to initialize
    
    // Run some basic commands to populate the terminal with output
    await helpers.typeText('echo "Hello from the terminal!"');
    await helpers.pressKey('Enter');
    await helpers.wait(500);
    
    await helpers.typeText('ls -la');
    await helpers.pressKey('Enter');
    await helpers.wait(500);
    
    await helpers.typeText('node --version');
    await helpers.pressKey('Enter');
    await helpers.wait(500);
    
    await helpers.typeText('env | head -10');
    await helpers.pressKey('Enter');
    await helpers.wait(500);
    
    await helpers.typeText('pwd');
    await helpers.pressKey('Enter');
    await helpers.wait(500);
    
    // Take a screenshot showing both editor and terminal
    await helpers.saveScreenshot('Editor with integrated terminal showing command output');
}
