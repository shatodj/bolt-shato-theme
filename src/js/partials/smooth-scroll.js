document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const href = e.target.getAttribute('href');
    const hash = href[0] === '/' ? href.substr(1) : href;

    document.querySelector(hash).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
