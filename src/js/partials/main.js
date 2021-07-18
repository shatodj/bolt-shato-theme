/* eslint-disable no-console */
import menu from './burger-menu';
import slider from './slider';
import lightbox from './lightbox';
import lazyMedia from './lazy';

/**
 * Init script
 */
export default () => new Promise((resolve, reject) => {
  try {
    // menu
    menu({ selector: '.burger' });

    // slider
    slider({ selector: '.slider' });

    // initializing lazy images and iFrames
    lazyMedia({
      elementSelector: '.lazy',
      tags: ['IFRAME', 'IMG'],
      onLoadCallback: (element) => {
        //
      }
    });

    // Waiting for lazy modules to be loaded
    lightbox({ selector: '.use-magnific', delegate: 'a.magnific' });

    resolve();
  } catch (error) {
    reject(error);
  }
});
