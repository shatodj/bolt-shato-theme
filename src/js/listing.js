/* eslint-disable no-console */

import '../scss/listing.scss';

import init from './partials/main';
import navbar from './components/navbar';

init().then(() => {
  navbar('.navbar', 50);
});
