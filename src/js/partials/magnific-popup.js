/**
 * @param {jQuery} $ jQuery
 * @param {object} _ Popup options
 */
export default ($, { selector, delegate }) => {
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
