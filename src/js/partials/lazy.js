/* eslint-disable no-param-reassign */
import inView from 'in-view';

/**
 * Preload image
 * @param {srting} src
 */
export const preloadImage = (src) => new Promise((resolve, reject) => {
  if (!src) {
    reject(ReferenceError("Undefined image source."));
  }
  
  const img = new Image();
  img.src = src;

  img.addEventListener('load', () => resolve(img));
  img.addEventListener('error', (err) => reject(err));
});

export const preloadIFrame = (iframeElement) => new Promise((resolve, reject) => {
  if (!src) {
    reject(ReferenceError("Undefined image source."));
  }

  iframeElement.addEventListener('load', () => resolve(img));
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
    if (!element.dataset.isProccessed && element.dataset.src) {
      // start actual loading by tag (supports only images and iframes)
      // TODO: support other types
      if (element.tagName === 'IMG') {
        preloadImage(element.dataset.src).then(() => {
          element.setAttribute('src', element.dataset.src);
          finalizeLement(element);
          
          typeof onLoadCallback == 'function' && onLoadCallback(element);
        });
      } else {
        preloadIFrame(element).then(() => {
          finalizeLement(element);
          
          typeof onLoadCallback == 'function' && onLoadCallback(element);
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
