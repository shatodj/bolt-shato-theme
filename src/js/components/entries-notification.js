import axios from "axios";

export default ({ selector = "notification" } = {}) => {
  // load the notification panel using axios
  const notificationPanel = document.querySelector(selector);

  if (!notificationPanel) {
    console.warn(`Notification panel with selector "${selector}" not found.`);
    return;
  }

  const isNotificationRead = (notificationId) => {
    return document.cookie
      .split("; ")
      .some((row) =>
        row.trim().startsWith(`notification_${notificationId}=read`),
      );
  };

  const itemTemplate = document.querySelector(
    "#shpr-notification-template",
  ).content;

  // delete button
  const onDeleteButtonClick = (e) => {
    e.preventDefault();

    const notificationId = e.target.closest(".shpr-notification").dataset.id;
    if (notificationId) {
      // set the notification as read to the cookies
      document.cookie = `notification_${notificationId}=read; path=/; max-age=31536000`; // 1 year

      // remove the notification from the panel
      const notificationItem = e.target.closest(".shpr-notification");
      if (notificationItem) {
        notificationItem.remove();
      }
    }
  };

  // Fetch the notification content
  axios
    .get("api/contents?contentType=entries")
    .then((response) => {
      console.log("Notifications fetched successfully:", response.data);
      if (response.data && response.data.length > 0) {
        // Clear existing content
        notificationPanel.innerHTML = "";

        // Create a list to hold notifications
        const container = document.createElement("div");

        // get lang from html tag
        const lang = document.documentElement.lang || "en";

        // Populate the list with notifications
        response.data.forEach((notification) => {
          // Check if the notification is already read
          const isRead = isNotificationRead(notification.id);
          if (isRead) {
            return; // Skip already read notifications
          }

          const item = itemTemplate.cloneNode(true);

          item.querySelector(".shpr-notification>.title").textContent =
            notification.fieldValues.title[lang];

          item.querySelector(".shpr-notification>.content").textContent =
            notification.fieldValues.teaser[lang];

          // set data-id attribute for the notification item
          item.querySelector(".shpr-notification").dataset.id = notification.id;
          item.querySelector(".delete").onclick = onDeleteButtonClick;

          container.appendChild(item);
        });

        // Append the list to the notification panel
        notificationPanel.appendChild(container);
      } else {
        notificationPanel.textContent = "No notifications available.";
      }
    })
    .catch((error) => {
      console.error("Error fetching notifications:", error);
    });
};
