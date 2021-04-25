/* eslint-disable no-console */
import menu from './burger-menu';
import lazyModule from './lazy-module';
import slider from './slider';
import magnificPopup from './magnific-popup';
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

    // Waiting for lazy modules to be loaded
    lazyModule('JQUERY', ($) => {
      magnificPopup($, { selector: '.use-magnific', delegate: 'a.magnific' });
    });

    // initializing lazy images and iFrames
    lazyMedia({
      elementSelector: '.lazy',
      tags: ['IFRAME', 'IMG'],
    });

    resolve();
  } catch (error) {
    reject(error);
  }
});
