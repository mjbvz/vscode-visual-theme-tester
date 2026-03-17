// Auto-generated scenario code
// Source: scenarios/terminal/terminal-colors.prompt.md
// prompt-hash: 00a1bbfd38f4
// Generated: 2026-03-13T16:20:25.923Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panel to focus on editor and terminal
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    
    // Open the source file
    await helpers.openFile("src/main.js");
    await helpers.wait(500);
    
    // Open the integrated terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(1000); // Wait for terminal to initialize
    
    // Run commands to display colorful ANSI output
    // Normal colors
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
    await helpers.wait(200);
    
    // Bold colors
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
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[1;37mBold White text\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    // Colored backgrounds
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
    await helpers.wait(200);
    
    // Combined foreground and background colors
    await helpers.typeText('printf "\\033[30;43mBlack on Yellow\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[37;41mWhite on Red\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(200);
    
    await helpers.typeText('printf "\\033[33;44mYellow on Blue\\033[0m\\n"');
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Take screenshot showing the editor and terminal with colorful output
    await helpers.saveScreenshot("Editor and terminal with ANSI color output");
}
