import bulmaCarousel from 'bulma-carousel';

/**
 * @param {object} options
 */
export default ({ selector, ...options }) => {
  // See: https://creativebulma.net/product/carousel/demo#
  const carousels = bulmaCarousel.attach(selector, {
    slidesToScroll: 1,
    slidesToShow: 3,
    infinite: false,
    ...options,
  });

  carousels.forEach((carousel) => {
    // reset className
    if (carousel.slides) {
      carousel.slides.forEach((slide) => {
        // eslint-disable-next-line no-param-reassign
        if (slide.firstElementChild) { slide.firstElementChild.className = 'column'; }
      });
    }

    carousel.on('before:show', () => {
      // reset body scrollbar so lazy elements will load using in-view module
      window.scroll(0, window.scrollY + 1);
    });
    carousel.on('after:show', () => {
      // reset body scrollbar so lazy elements will load using in-view module
      window.scroll(0, window.scrollY - 1);
    });
  });
};
