import "../scss/homepage.scss";

import init from "./partials/main.js";
import smoothScroll from "./components/smooth-scroll.js";
import entriesNotification from "./components/entries-notification.js";

init().then(() => {
  smoothScroll();
  entriesNotification({ selector: ".shpr-notification-panel" });
});
