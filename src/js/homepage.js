/* eslint-disable no-console */

import '../scss/homepage.scss';

import init from './partials/main';
import './components/smooth-scroll';
import navbar from './components/navbar';

init().then(() => {
  navbar('.navbar', 50);
});
