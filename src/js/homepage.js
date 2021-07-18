/* eslint-disable no-console */

import '../scss/homepage.scss';

import init from './partials/main';
import lazySectionBackground from './partials/lazy-background';
import './partials/smooth-scroll';
import scaredNavbar from './partials/scared-element';

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
  // hiding navbar on first home section (when menu is visible)
  scaredNavbar('.scared-element', '.shpr-menu');
});
