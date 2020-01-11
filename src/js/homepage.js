/* eslint-disable no-console */

import init from './partials/main';
import lazySectionBackground from './partials/lazy-section-background';
import lazy from './partials/lazy';
import './partials/smooth-scroll';

import '../scss/homepage.scss';

init().then(() => {
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
  lazy({
    elementSelector: '.lazy',
    tags: ['IFRAME', 'IMG'],
  });
});
