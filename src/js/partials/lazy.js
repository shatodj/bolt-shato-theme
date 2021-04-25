/* eslint-disable no-param-reassign */
import inView from 'in-view';

/**
 * Lazy media loader for images and iframes
 * @param {object} param0
 */
const lazy = ({ elementSelector, tags }) => {
  /**
   * Loading of the IMAGE element
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
   * Loading of the IFrame element
   * @param {HTMLElement} element
   */
  const loadIframe = (element) => new Promise((resolve, reject) => {
    element.onload = () => {
      resolve(element);
    };

    element.onerror = () => {
      reject(element);
    };

    element.setAttribute('src', element.dataset.src);
  });

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
        loadImage(element.dataset.src).then(() => {
          element.setAttribute('src', element.dataset.src);
          finalizeLement(element);
        });
      } else {
        loadIframe(element).then(() => {
          finalizeLement(element);
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
