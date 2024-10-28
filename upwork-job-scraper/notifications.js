let notificationsEnabled = true; // Default value

// Add function to update the notifications state
function updateNotificationsEnabled(enabled) {
  notificationsEnabled = enabled;
}

function sendNotification(message, duration = 30000) {
  // Get the current state from storage before sending notification
  chrome.storage.sync.get(['notificationsEnabled'], (data) => {
    if (data.notificationsEnabled === false) {
      addToActivityLog("Push notifications are disabled. Skipping notification.");
      return;
    }

    chrome.notifications.create(
      {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon48.png"),
        title: "Upwork Job Scraper",
        message: message,
        buttons: [{ title: "Close" }],
      },
      (notificationId) => {
        if (chrome.runtime.lastError) {
          console.error("Notification error: ", chrome.runtime.lastError.message);
        }
      }
    );
  });
}
