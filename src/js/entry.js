/* eslint-disable no-console */

import init from './partials/main';

import lazy from './partials/lazy';

import '../scss/entry.scss';

init().then(() => {
  lazy({
    elementSelector: '.lazy',
    tags: ['IFRAME', 'IMG'],
  });
});
