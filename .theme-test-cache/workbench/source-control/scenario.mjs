// Auto-generated scenario code
// Source: scenarios/workbench/source-control.prompt.md
// prompt-hash: 7cde594bf767
// Generated: 2026-03-13T08:29:04.927Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar, panel, and secondary sidebar to focus on the Source Control view
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);

    // Open the Source Control sidebar
    await helpers.runCommand("View: Show Source Control");
    await helpers.wait(1000);

    // Take a screenshot showing the Source Control view with file changes
    await helpers.saveScreenshot("Source Control sidebar showing staged changes, unstaged changes, and untracked files");
    await helpers.wait(500);

    // Open one of the files to show it's part of the workspace
    await helpers.openFile("modified-file.js");
    await helpers.wait(500);

    // Take another screenshot showing the file with the Source Control sidebar still visible
    await helpers.saveScreenshot("Source Control view with modified file open showing change indicators");
}
