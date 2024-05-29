/* eslint-disable no-console */

import '../scss/homepage.scss';

import init from './partials/main.js';
import './components/smooth-scroll.js';
import navbar from './components/navbar.js';

init().then(() => {
  navbar('.navbar', 50);
});
