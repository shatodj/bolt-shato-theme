import "../../scss/components/quote.scss";

export default ({ selector }) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) {
    return;
  }

  elements.forEach((element) => {
    const quoteElement = document.createElement("span");
    quoteElement.setAttribute("aria-hidden", "true");
    quoteElement.classList.add("shpr-quote-icon");
    quoteElement.classList.add("icon");
    quoteElement.classList.add("is-large");

    const quoteFontElement = document.createElement("i");
    quoteFontElement.setAttribute("aria-hidden", "true");
    quoteFontElement.classList.add("fas");
    quoteFontElement.classList.add("fa-2x");
    quoteFontElement.classList.add("fa-quote-left");

    quoteElement.appendChild(quoteFontElement);
    element.appendChild(quoteElement);
  });
};
