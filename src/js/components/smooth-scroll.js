export default ({ selector, topTreshold }) => {
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

  document.addEventListener("scroll", () => {
    document.querySelectorAll(selector).forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top > 0 && rect.top < topTreshold) {
        const location = window.location.toString().split("#")[0];
        // eslint-disable-next-line no-restricted-globals
        history.replaceState(null, null, `${location}#${element.id}`);
      }
    });
  });
};
