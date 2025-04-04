/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import inView from "in-view";
import progressiveImage from "./progressive-image.js";
import youtubeVideoOverlay from "./youtube-video-overlay.js";
import videoOverlay from "./video-overlay.js";

/**
 * Proccess element / section
 * @param {HTMLElement} element
 */
const proccessElement = (element) => {
  progressiveImage(
    element,
    (url) => {
      element.querySelectorAll(".shpr-background").forEach((bgElement) => {
        bgElement.style.backgroundImage = `url('${url}')`;
      });

      element.classList.add("is-loaded");
    },
    () => {
      element.classList.add("is-error");
    },
  );

  if (element.dataset.embedded != null) {
    youtubeVideoOverlay(
      element.dataset.embedded,
      element.querySelector(".shpr-background-video"),
      () => {
        element.classList.add("is-loaded");
      },
    );
  }

  if (element.dataset.video != null) {
    videoOverlay(
      element.dataset.video,
      element.querySelector(".shpr-background-video"),
      () => {
        element.classList.add("is-loaded");
      },
    );
  }
};

export default ({ elementSelector }) => {
  // inview - wait for element visible on screen
  inView(elementSelector).on("enter", (element) => {
    // do not procees element that has been processed already
    if (!element.classList.contains("is-processed")) {
      proccessElement(element);
    }
  });
};
