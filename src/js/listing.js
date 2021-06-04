/* eslint-disable no-console */

import '../scss/listing.scss';

import init from './partials/main';
import lazySectionBackground from './partials/lazy-section-background';

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
});

