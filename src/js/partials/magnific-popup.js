
import $ from 'jquery';
import 'magnific-popup';

import 'magnific-popup/src/css/main.scss';

export default ({ selector, delegate }) => {
  const elements = $(selector);

  if (!elements.length) {
    return;
  }

  $(selector).magnificPopup({
    delegate,
    type: 'image',
    gallery: { enabled: true },
    // other options
  });
};
