/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import inView from 'in-view';
import progressiveImage from './progressive-image.js';

export const preloadIFrame = (iframeElement) => new Promise((resolve, reject) => {
  if (!iframeElement) {
    reject(ReferenceError('Undefined iframe source.'));
  }

  iframeElement.addEventListener('load', () => resolve(iframeElement));
  iframeElement.addEventListener('error', (err) => reject(err));

  iframeElement.setAttribute('src', iframeElement.dataset.src);
});

/**
 * Lazy media loader for images and iframes
 * @param {object} param0
 */
const lazy = ({ elementSelector, tags, onLoadCallback }) => {
  /**
   * Finalize loading
   * @param {HTMLElement} element
   */
  const finalizeLement = (element) => {
    element.dataset.isProccessed = true;
    element.classList.remove('lazy');
  };

  /**
   * Set src attribute from data-src
   * @param {HTMLElement} element
   */
  const proccessElement = (element) => {
    if (!element.classList.contains('is-processed') && element.dataset.src) {
      // start actual loading by tag (supports only images and iframes)
      if (element.tagName === 'IMG') {
        progressiveImage(element, (url) => {
          element.setAttribute('src', url);
          element.classList.add('is-loaded');
        });
      } else {
        preloadIFrame(element).then(() => {
          finalizeLement(element);

          typeof onLoadCallback === 'function' && onLoadCallback(element);
        });
      }
    }
  };

  // inview - wait for element visible on screen
  inView(elementSelector).on('enter', (element) => {
    // if element tagname has one of the `tags` then process the element
    if (tags.indexOf(element.tagName) >= 0) {
      proccessElement(element);
    }
  });
};

export default lazy;
