// Auto-generated scenario code
// Source: scenarios/workbench/notifications.prompt.md
// prompt-hash: f4f9333233d6
// Generated: 2026-03-13T08:29:44.209Z
// Model: claude-sonnet-4-20250514

export default async function(helpers) {
    // Hide sidebar and panel to focus on the main content
    await helpers.runCommand("View: Close Sidebar");
    await helpers.runCommand("View: Close Panel");
    await helpers.runCommand("View: Close Secondary Side Bar");
    await helpers.wait(500);
    
    // Open the example file
    await helpers.openFile("src/example.js");
    await helpers.wait(1000);
    
    // Trigger some notifications by running invalid/unknown commands
    // These will generate error notifications
    try {
        await helpers.runCommand("Unknown Command That Does Not Exist");
        await helpers.wait(1000);
    } catch (e) {
        // Expected to fail, which creates a notification
    }
    
    try {
        await helpers.runCommand("Another Invalid Command");
        await helpers.wait(1000);
    } catch (e) {
        // Expected to fail, which creates a notification
    }
    
    // Try one more invalid command to generate multiple notifications
    try {
        await helpers.runCommand("Nonexistent Feature");
        await helpers.wait(1000);
    } catch (e) {
        // Expected to fail, which creates a notification
    }
    
    // Wait a moment for notifications to appear
    await helpers.wait(1500);
    
    // Take a screenshot showing any notification toasts that appeared
    await helpers.saveScreenshot("Notification toasts from invalid commands");
    
    // Now open the notification center
    await helpers.runCommand("Notifications: Show Notifications");
    await helpers.wait(1000);
    
    // Take a screenshot of the notification center
    await helpers.saveScreenshot("Notification center showing accumulated notifications");
    
    // Wait a moment to see the notification center clearly
    await helpers.wait(1000);
}
