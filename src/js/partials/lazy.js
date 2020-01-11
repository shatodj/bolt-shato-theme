/* eslint-disable no-param-reassign */

import inView from 'in-view';

import '../../scss/partials/lazy.scss';

/**
 *
 * @param {string} src
 */
const loadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = src;

  img.onload = () => {
    resolve(img);
  };
  img.onerror = () => {
    reject(img);
  };
});

/**
 *
 * @param {HTMLElement} element
 */
const finalizeLement = (element) => {
  element.setAttribute('src', element.dataset.src);
  element.dataset.isProccessed = true;
};

/**
 * Set src attribute from data-src
 * @param {HTMLElement} element
 */
const proccessElement = (element) => {
  if (!element.dataset.isProccessed && element.dataset.src) {
    if (element.tagName === 'IMG') {
      loadImage(element.dataset.src).then(() => {
        finalizeLement(element);
        element.classList.add('is-loaded');
      });
    } else {
      finalizeLement(element);
    }
  }
};

export default ({ elementSelector, tags }) => {
  // inview - wait for element visible on screen
  inView(elementSelector).on('enter', (element) => {
    // if tagname is iframe or img then proccss element
    if (tags.indexOf(element.tagName) >= 0) {
      proccessElement(element);
    }
  });
};
