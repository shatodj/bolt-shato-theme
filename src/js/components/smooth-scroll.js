export default () => {
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }
      e.preventDefault();
      const hash = href[0] === "/" ? href.substr(1) : href;

      document.querySelector(hash).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};
