export default (selector, offset) => {
  const navbarElement = document.querySelector(selector);

  if (!navbarElement) {
    return;
  }

  const scrollCheck = () => {
    if (window.scrollY > offset) {
      navbarElement.classList.remove('transparent');
    } else {
      navbarElement.classList.add('transparent');
    }
  };

  window.onscroll = () => {
    scrollCheck();
  };

  scrollCheck();
};
