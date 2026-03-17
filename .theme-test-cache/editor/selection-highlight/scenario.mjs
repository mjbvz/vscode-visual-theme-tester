// Auto-generated scenario code
// Source: scenarios/editor/selection-highlight.prompt.md
// prompt-hash: a78f462077f1
// Generated: 2026-03-13T16:12:22.727Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide UI elements to focus on the editor
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  
  // Open the TypeScript file
  await helpers.openFile("src/user-service.ts");
  await helpers.wait(500);

  // Focus on the editor
  await helpers.runCommand("View: Focus Active Editor Group");
  await helpers.wait(300);

  // Navigate to line 16 where there's a 'user' variable we can select
  await helpers.runCommand("Go to Line...");
  await helpers.typeText("16");
  await helpers.pressKey("Enter");
  await helpers.wait(300);

  // Move to the word "user" in the line "const user = this.users.find..."
  // Position cursor at the beginning of "user"
  await helpers.pressKey("End");
  await helpers.pressKey("Home");
  // Move to the "user" variable (after "const ")
  for (let i = 0; i < 10; i++) {
    await helpers.pressKey("ArrowRight");
  }
  await helpers.wait(200);

  // Double-click to select the word "user"
  await helpers.pressKey("Meta+D"); // This is equivalent to double-click + select next occurrence
  await helpers.wait(500);

  // Add more selections by using "Add Selection To Next Find Match" a few times
  await helpers.runCommand("Add Selection To Next Find Match");
  await helpers.wait(300);
  
  await helpers.runCommand("Add Selection To Next Find Match");
  await helpers.wait(300);

  await helpers.runCommand("Add Selection To Next Find Match");
  await helpers.wait(300);

  // Take a screenshot showing the multiple selections and highlighting
  await helpers.saveScreenshot("Multiple cursor selection with highlighted occurrences of 'user' variable");
}
