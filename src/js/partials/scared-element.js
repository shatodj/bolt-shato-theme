import '../../scss/partials/scared-element.scss';

import inView from 'in-view';

/**
 * Hide/show element when the other is visible
 * @param {string} scaredElementSelector
 * @param {string} inviewElementSelector
 */
const scaredNavbar = (scaredElementSelector, inviewElementSelector) => {
  const scaredElements = document.querySelectorAll(scaredElementSelector);
  if (!scaredElements.length) {
    return;
  }

  scaredElements.forEach((scaredElement) => {
    // default settings
    if (!inView.is(scaredElement)) {
      scaredElement.classList.add('brave');
    }

    // movement events
    inView(inviewElementSelector)
      .on('enter', () => {
        scaredElement.classList.remove('brave');
      })
      .on('exit', () => {
        scaredElement.classList.add('brave');
      });
  });
};

export default scaredNavbar;
