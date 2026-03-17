// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/terminal/terminal-colors.prompt.md
// prompt-hash: 00a1bbfd38f4
// Generated: 2026-03-13T19:28:40.212Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panel to focus on editor and terminal
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);
    
    // Open the source file
    await helpers.openFile("src/main.js");
    await helpers.wait(500);
    
    // Open the integrated terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(1000);
    
    // Run commands with colorful ANSI output
    // First, clear the terminal
    await helpers.typeText("clear");
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Print normal colors
    await helpers.typeText('printf "\\033[31mRed text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[32mGreen text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[33mYellow text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[34mBlue text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[35mMagenta text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[36mCyan text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[37mWhite text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Print bold colors
    await helpers.typeText('printf "\\033[1;31mBold Red text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;32mBold Green text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;33mBold Yellow text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;34mBold Blue text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;35mBold Magenta text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;36mBold Cyan text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Print background colors
    await helpers.typeText('printf "\\033[41mRed background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[42mGreen background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[43mYellow background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[44mBlue background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[45mMagenta background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[46mCyan background\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(300);
    
    // Add some combined effects
    await helpers.typeText('printf "\\033[1;37;41mBold White on Red\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;30;42mBold Black on Green\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[4;36mUnderlined Cyan\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Take screenshot showing the editor and colorful terminal output
    await helpers.saveScreenshot("Editor and terminal with ANSI color output");
}
