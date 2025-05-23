import "../../scss/components/navbar.scss";

export default (selector, offset) => {
  const navbarElement = document.querySelector(selector);

  if (!navbarElement) {
    return;
  }

  const scrollCheck = () => {
    if (window.scrollY > offset) {
      navbarElement.classList.remove("is-transparent");
    } else {
      navbarElement.classList.add("is-transparent");
    }
  };

  window.onscroll = () => {
    scrollCheck();
  };

  scrollCheck();
};
