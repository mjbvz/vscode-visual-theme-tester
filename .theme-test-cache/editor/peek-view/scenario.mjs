// Auto-generated scenario code
// Source: scenarios/editor/peek-view.prompt.md
// prompt-hash: e1a1183170fb
// Generated: 2026-03-13T16:12:40.674Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide UI elements to focus on the editor content
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);
    
    // Open the main TypeScript file
    await helpers.openFile("src/main.ts");
    await helpers.wait(1000);
    
    // Navigate to line 10 where calculateRectangleArea is called
    await helpers.runCommand("Go to Line...");
    await helpers.typeText("10");
    await helpers.pressKey("Enter");
    await helpers.wait(500);
    
    // Position cursor on the function call "calculateRectangleArea"
    // Move to the start of the line and then navigate to the function name
    await helpers.pressKey("Home");
    await helpers.wait(200);
    
    // Move cursor to the function call (after "const roomArea = ")
    for (let i = 0; i < 20; i++) {
        await helpers.pressKey("ArrowRight");
    }
    await helpers.wait(500);
    
    // Run Peek Definition command
    await helpers.runCommand("Peek Definition");
    await helpers.wait(1500); // Wait for peek widget to appear and load
    
    // Take screenshot showing the peek view
    await helpers.saveScreenshot("Peek Definition view showing calculateRectangleArea function definition inline");
}
