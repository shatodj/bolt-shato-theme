/* eslint-disable no-console */

import '../scss/services.scss';

import init from './partials/main';
import lazySectionBackground from './partials/lazy-background';
import navbar from './components/navbar';

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
  navbar('.navbar', 50);
});
