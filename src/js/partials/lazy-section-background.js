/* eslint-disable no-param-reassign */
import '../../scss/partials/lazy-background.scss';

import inView from 'in-view';
import { preloadImage } from "./lazy";

/**
 * Proccess element / section
 * @param {HTMLElement} element
 */
const proccessElement = (element) => {
  element.classList.add('is-processed');
  const { backgroundImage } = element.dataset;
  
  const addBackgroundUrl = (url) => {
    element.dataset.backgroundImageLoaded = url;

    element.querySelectorAll('.shpr-background').forEach((bgElement) => {
      bgElement.style.backgroundImage = `url('${url}')`;
    });

    element.classList.add('is-loaded');
  }

  if (backgroundImage) {
    // split by ';' to  make it possible to load progressively
    const imageUrls = backgroundImage.split(';');
    if (!imageUrls) {
      console.warn("No background images to load, but dataset exists.");
      return;
    }

    const firstUrl = imageUrls.shift();
    if (!firstUrl) {
      console.warn("No background images to load. Empty backround images data exists.");
      return;
    }
    const promise = preloadImage(imageUrls.shift())
      .then((img) => addBackgroundUrl(img.src));

    // load image by images one by one
    if (imageUrls.length) {
      imageUrls.forEach((url) => {
        if (url) {
          promise.then(() => preloadImage(url))
            .then((img) => addBackgroundUrl(img.src))
        }
      })
    }
  }
};

export default ({ elementSelector }) => {
  // inview - wait for element visible on screen
  inView(elementSelector).on('enter', (element) => {
    // do not procees element that has been processed already
    if (!element.classList.contains('is-processed')) {
      proccessElement(element);
    }
  });
};
