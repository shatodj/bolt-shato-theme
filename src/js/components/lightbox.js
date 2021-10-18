import 'fslightbox';

/**
 * @param {object} _ Popup options
 */
export default ({ selector, delegate }) => {
  const galleries = document.querySelectorAll(selector);

  if (!galleries.length) {
    return;
  }

  //  for each elements with a selector create gallery instaces using fslightbox
  galleries.forEach((galleryElement, index) => {
    // add data atrribute

    galleryElement.querySelectorAll(delegate).forEach((imageElement) => {
      imageElement.dataset.fslightbox = `gallery-${index}`;
    });
  });

  // eslint-disable-next-line no-undef
  refreshFsLightbox();
};
