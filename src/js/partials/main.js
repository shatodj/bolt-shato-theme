/* eslint-disable no-console */

import slider from './slider';
import menu from './burger-menu';
import magnificPopup from './magnific-popup';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

/**
 * Init
 */
export default () => {
  // menu
  menu({ selector: '.burger' });

  // Sliders
  slider({ selector: '.slider' });

  // mangific popup
  magnificPopup({ selector: '.shpr-gallery', delegate: 'a.magnific' });

  return Promise.resolve();
};
