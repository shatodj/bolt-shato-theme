import "../../scss/components/marquee.scss";

export default ({ selector }) => {
  const items = document.querySelectorAll(`${selector} > .marquee__item`);
  document
    .querySelector(selector)
    .style.setProperty("--marquee-items", items.length);

  items.forEach((item, index) => {
    item.style.setProperty("--marquee-item-index", index + 1);
  });
};
