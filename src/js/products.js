/* eslint-disable no-console */

import "../scss/products.scss";

import init from "./partials/main.js";
import navbar from "./components/navbar.js";

init().then(() => {
  navbar(".navbar", 50);
});
