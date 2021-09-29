/* eslint-disable no-console */

import '../scss/products.scss';

import init from './partials/main';
import lazySectionBackground from './partials/lazy-background';

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
});

