import $ from 'jquery';
import 'slick-carousel';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

const DEFAULT_SLIDER_COUNT = 2;

/**
 *
 * @param {HTMLElement} sliderElement
 * @param {} options
 */
const slider = (sliderElement) => {
  const slidesCount = sliderElement.childElementCount;

  const config = {
    slidesToShow: slidesCount < DEFAULT_SLIDER_COUNT ? 1 : DEFAULT_SLIDER_COUNT,
    slidesToScroll: 1,
    infinite: slidesCount > DEFAULT_SLIDER_COUNT,
    dots: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesCount < DEFAULT_SLIDER_COUNT ? 1 : DEFAULT_SLIDER_COUNT,
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
