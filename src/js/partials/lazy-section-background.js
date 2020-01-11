/* eslint-disable no-param-reassign */

import inView from 'in-view';

/**
 * Preload image
 * @param {srting} src
 * @param {HTMLElement} sectionElement
 */
const preloadImage = (src, sectionElement) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = src;

  // if background is ready then add background image to bg elements
  img.onload = () => {
    sectionElement.dataset.backgroundImageLoaded = src;

    sectionElement.querySelectorAll('.shpr-background').forEach((bgElement) => {
      bgElement.style.backgroundImage = `url('${src}')`;
    });

    sectionElement.classList.add('is-loaded');

    resolve(img);
  };

  img.onerror = () => {
    reject(img);
  };
});

/**
 * Proccess element / section
 * @param {HTMLElement} element
 */
const proccessElement = (element) => {
  element.classList.add('is-processed');
  const { backgroundImage } = element.dataset;

  if (backgroundImage) {
    // split by ';' to  make it possible to load progressively
    const imageUrls = backgroundImage.split(';');
    const promise = preloadImage(imageUrls.shift(), element);
    // load image by image using promises
    if (imageUrls.length) {
      imageUrls.forEach(() => {
        promise.then(() => {
          preloadImage(imageUrls.shift(), element);
        });
      });
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
