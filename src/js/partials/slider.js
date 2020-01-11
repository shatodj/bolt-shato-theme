import $ from 'jquery';
import 'slick-carousel';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

/**
 *
 * @param {HTMLElement} sliderElement
 * @param {} options
 */
const slider = (sliderElement) => {
  const slidesCount = sliderElement.childElementCount;

  const config = {
    slidesToShow: slidesCount < 3 ? 1 : 3,
    slidesToScroll: 1,
    infinite: slidesCount > 3,
    dots: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesCount < 3 ? 1 : 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesCount < 2 ? 1 : 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  console.log('config', config);

  $(sliderElement).slick(config);
};

export default ({ selector }) => {
  $(selector).each((idx, element) => {
    slider(element);
  });
};
