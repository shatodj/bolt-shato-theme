/* eslint-disable no-console */
import menu from "../components/burger-menu.js";
import slider from "../components/slider.js";
import lightbox from "../components/lightbox.js";
import navbar from "../components/navbar.js";
import feed from "../components/feed.js";
import lazyMedia from "./lazy.js";
import scaredElement from "../components/scared-element.js";
import lazySectionBackground from "./lazy-background.js";

/**
 * Init script
 */
export default () =>
  new Promise((resolve, reject) => {
    try {
      // menu
      menu({ selector: ".burger" });

      // slider
      slider({ selector: ".slider" });

      // initializing lazy images and iFrames
      lazyMedia({
        elementSelector: ".lazy",
        tags: ["IFRAME", "IMG"],
        onLoadCallback: () => {
          //
        },
      });

      // initializing Lazy Section Backgrounds
      lazySectionBackground({ elementSelector: ".shpr-lazy-background" });

      // Waiting for lazy modules to be loaded
      lightbox({ selector: ".use-magnific", delegate: "a.magnific" });

      // hiding navbar on first home section (when menu is visible)
      scaredElement(".navbar", ".hero-body>.container .title");

      // Feed item (read more)
      feed({ selector: ".feed-item" });

      // navbar animation
      navbar(".navbar.is-transparent", 50);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
