// Auto-generated scenario code
// Source: scenarios/workbench/activity-bar.prompt.md
// prompt-hash: d56183cf6c42
// Generated: 2026-03-13T16:32:13.125Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Close panel and secondary sidebar to focus on activity bar
    await helpers.runCommand("View: Close Panel");
    await helpers.wait(300);
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(300);

    // Open the TypeScript file to trigger TypeScript language service and generate errors
    await helpers.openFile("src/main.ts");
    await helpers.wait(1000);

    // Open Explorer sidebar to make activity bar visible
    await helpers.runCommand("View: Show Explorer");
    await helpers.wait(500);

    // Wait a bit more for TypeScript errors to be processed and badges to appear
    await helpers.wait(2000);

    // Take a screenshot showing the activity bar with badges
    await helpers.saveScreenshot("Activity bar with Explorer open showing badges on Problems and other icons");
}
