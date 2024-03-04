/* eslint-disable no-console */
import menu from '../components/burger-menu';
import slider from '../components/slider';
import lightbox from '../components/lightbox';
import lazyMedia from './lazy';
import scaredElement from '../components/scared-element';
import lazySectionBackground from './lazy-background';
import cookieConsent from './cookie-consent';

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
      onLoadCallback: () => {
        //
      },
    });

    // initializing Lazy Section Backgrounds
    lazySectionBackground({ elementSelector: '.shpr-lazy-background' });

    // Waiting for lazy modules to be loaded
    lightbox({ selector: '.use-magnific', delegate: 'a.magnific' });

    // hiding navbar on first home section (when menu is visible)
    scaredElement('.navbar', '.hero-body>.container .title');

    // cookie consent handling
    cookieConsent({ selector: '.cookie-consent', buttonSelector: '.cookie-consent .button' })

    resolve();
  } catch (error) {
    reject(error);
  }
});
