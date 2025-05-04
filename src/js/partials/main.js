/* eslint-disable no-console */
import menu from "../components/burger-menu.js";
import slider from "../components/slider.js";
import lightbox from "../components/lightbox.js";
import navbar from "../components/navbar.js";
import feed from "../components/feed.js";
import lazyMedia from "./lazy.js";
import lazySectionBackground from "./lazy-background.js";
import marquee from "../components/marquee.js";
import quote from "../components/quote.js";

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

      // Feed item (read more)
      feed({ selector: ".feed-item" });

      // navbar animation
      navbar(".navbar.is-animated", 50);

      // marquee
      marquee({ selector: ".marquee" });

      // quotes
      quote({ selector: ".shpr-quote" });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
