export default ({ selector }) => {
  const burger = document.querySelector(selector);

  if (!burger) {
    return;
  }

  const nav = document.querySelector(`#${burger.dataset.target}`);

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  }, { passive: true });
};
