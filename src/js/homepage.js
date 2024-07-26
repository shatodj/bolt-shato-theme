/* eslint-disable no-console */

import "../scss/homepage.scss";

import init from "./partials/main.js";
import smoothScroll from "./components/smooth-scroll.js";

init().then(() => {
  smoothScroll({
    selector: ".shpr-section-anchor",
    topTreshold: 200,
  });
});
