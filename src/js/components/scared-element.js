import inView from 'in-view';

/**
 * Hide/show element when the other is visible
 * @param {string} scaredElementSelector
 * @param {string} inviewElementSelector
 */
const scaredElement = (scaredElementSelector, inviewElementSelector) => {
  const scaredElements = document.querySelectorAll(scaredElementSelector);
  const inviewElement = document.querySelector(inviewElementSelector);
  if (!scaredElements.length || !inviewElement) {
    return;
  }

  scaredElements.forEach((element) => {
    // default settings
    element.classList.add('is-scared');
    if (!inView.is(inviewElement)) {
      element.classList.add('but-brave');
    }

    // movement events
    inView(inviewElementSelector)
      .on('enter', () => {
        element.classList.remove('but-brave');
      })
      .on('exit', () => {
        element.classList.add('but-brave');
      });
  });
};

export default scaredElement;
