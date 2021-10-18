/* eslint-disable no-console */

import '../scss/homepage.scss';

import init from './partials/main';
import lazySectionBackground from './partials/lazy-background';
import './components/smooth-scroll';
import navbar from './components/navbar';

init().then(() => {
  // initializing Lazy Section Backgrounds
  lazySectionBackground({ elementSelector: '.shpr-lazy-background' });
  navbar('.navbar', 50);
});
