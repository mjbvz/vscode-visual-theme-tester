// Auto-generated scenario code
// Source: /Users/matb/projects/vscode-visual-theme-tester/example-workspace/theme-scenarios/workbench/notifications.prompt.md
// prompt-hash: f4f9333233d6
// Generated: 2026-03-13T19:25:48.204Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
  // Hide sidebar and panel to focus on notifications
  await helpers.runCommand("View: Close Sidebar");
  await helpers.runCommand("View: Close Panel");
  await helpers.runCommand("View: Close Secondary Side Bar");
  await helpers.wait(300);

  // Open the README file
  await helpers.openFile("README.md");
  await helpers.wait(500);

  // Take a screenshot of the initial state
  await helpers.saveScreenshot("Initial editor with README file");

  // Trigger some error notifications by running invalid commands
  // These will generate error notifications
  await helpers.runCommand("Invalid Command That Does Not Exist");
  await helpers.wait(800);

  await helpers.runCommand("Another Nonexistent Command");
  await helpers.wait(800);

  await helpers.runCommand("Fake Command for Demo");
  await helpers.wait(800);

  // Try to run a command that might generate a different type of notification
  await helpers.runCommand("Developer: Set Log Level");
  await helpers.wait(500);
  // Cancel out of this dialog
  await helpers.pressKey("Escape");
  await helpers.wait(500);

  // Take a screenshot showing any visible notification toasts
  await helpers.saveScreenshot("Editor with notification toasts visible");

  // Now open the notification center to see all notifications
  await helpers.runCommand("Notifications: Show Notifications");
  await helpers.wait(1000);

  // Take a screenshot of the notification center
  await helpers.saveScreenshot("Notification center showing accumulated notifications");

  // Wait a moment to let the user see the notification center
  await helpers.wait(1500);

  // Close the notification center by pressing Escape
  await helpers.pressKey("Escape");
  await helpers.wait(500);

  // Final screenshot showing the editor after closing notifications
  await helpers.saveScreenshot("Editor after closing notification center");
}
