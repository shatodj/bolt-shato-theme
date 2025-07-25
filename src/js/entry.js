/* eslint-disable no-console */

import "../scss/entry.scss";

import init from "./partials/main.js";
import lazySectionBackground from "./partials/lazy-background.js";

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: ".shpr-lazy-background" });
});
