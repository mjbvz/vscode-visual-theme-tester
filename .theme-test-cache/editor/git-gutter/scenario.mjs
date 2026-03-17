// Auto-generated scenario code
// Source: scenarios/editor/git-gutter.prompt.md
// prompt-hash: e721b9857a32
// Generated: 2026-03-13T16:13:56.669Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Close sidebar and panel to focus on the editor
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);

    // Initialize git repository and make initial commit
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(1000);
    
    // Initialize git and make initial commit
    await helpers.typeText("git init", 50);
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    await helpers.typeText("git add .", 50);
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    await helpers.typeText('git commit -m "Initial commit with calculator class"', 50);
    await helpers.pressKey("Enter");
    await helpers.wait(1000);
    
    // Close terminal
    await helpers.runCommand("View: Toggle Terminal");
    await helpers.wait(500);

    // Open the TypeScript file
    await helpers.openFile("src/calculator.ts");
    await helpers.wait(1000);

    // Focus on the editor
    await helpers.runCommand("View: Focus Active Editor Group");
    await helpers.wait(500);

    // Navigate to line 8 to modify the add method (this will be a changed line - blue)
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("8");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Go to end of line and modify it
    await helpers.pressKey("End");
    await helpers.typeText(" // Updated to include logging");
    await helpers.wait(500);

    // Navigate to line 15 to add some new lines (green gutter)
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("15");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Go to end of line and add new lines
    await helpers.pressKey("End");
    await helpers.pressKey("Enter");
    await helpers.typeText("        console.log(`Addition: ${a} + ${b} = ${result}`);\n");
    await helpers.typeText("        // New feature: log all additions\n");
    await helpers.wait(500);

    // Navigate to delete some lines (around lines 25-27 to create red triangle)
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("28");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Select and delete the multiply method (lines 28-33)
    await helpers.pressKey("Home");
    await helpers.runCommand("Select All");
    await helpers.wait(200);
    // First clear selection by clicking at current position
    await helpers.pressKey("ArrowRight");
    await helpers.wait(200);
    
    // Now select the multiply method lines to delete
    await helpers.pressKey("Home");
    // Select from start of multiply method to end
    for (let i = 0; i < 6; i++) {
        await helpers.pressKey("Shift+ArrowDown");
        await helpers.wait(100);
    }
    // Delete the selected lines
    await helpers.pressKey("Delete");
    await helpers.wait(500);

    // Navigate to modify another existing line (change the comment)
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("2");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    await helpers.pressKey("End");
    // Change the comment
    await helpers.runCommand("Select All");
    await helpers.wait(200);
    await helpers.pressKey("ArrowRight"); // Clear selection
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("2");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Select the entire line 2 and replace it
    await helpers.pressKey("Home");
    await helpers.pressKey("Shift+End");
    await helpers.typeText(" * An enhanced calculator class with logging and history features");
    await helpers.wait(500);

    // Save the file to trigger git diff
    await helpers.pressKey("Meta+s");
    await helpers.wait(1000);

    // Scroll to the top to show the gutter decorations better
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("1");
    await helpers.pressKey("Enter");
    await helpers.wait(1000);

    // Take screenshot showing the git gutter decorations
    await helpers.saveScreenshot("Git gutter showing added lines (green), modified lines (blue), and deleted lines (red triangle)");
}
