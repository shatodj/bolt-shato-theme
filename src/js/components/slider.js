import bulmaCarousel from "bulma-carousel";

/**
 * @param {object} options
 */
export default ({ selector, ...options }) => {
  // See: https://bulma-carousel.onrender.com/

  const carousels = bulmaCarousel.attach(selector, {
    // slidesToScroll: 1,
    // slidesToShow: 2,
    infinite: false,
    ...options,
  });

  carousels.forEach((carousel) => {
    // reset className
    if (carousel.slides) {
      carousel.slides.forEach((slide) => {
        const { firstElementChild } = slide;
        if (firstElementChild) {
          firstElementChild.className = "column";
        }
      });
    }

    carousel.on("before:show", () => {
      // reset body scrollbar so lazy elements will load using in-view module
      window.scroll(0, window.scrollY + 1);
    });
    carousel.on("after:show", () => {
      // reset body scrollbar so lazy elements will load using in-view module
      window.scroll(0, window.scrollY - 1);
    });
  });
};
