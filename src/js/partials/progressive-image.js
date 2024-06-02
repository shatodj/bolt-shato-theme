/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

/**
 * Preload image
 * @param {srting} src
 */
const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    if (!src) {
      reject(ReferenceError("Undefined image source."));
    }

    const img = new Image();
    img.src = src;

    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
  });

/**
 * Progressively load the images on element
 */
export default (element, onSuccess, onError) => {
  if (!element.tagName === "IMG") {
    console.warn("Unalble to progressive load non image element.");
    return;
  }

  element.classList.add("is-processed");
  const { src } = element.dataset;

  if (src) {
    // split by ';' to  make it possible to load progressively
    const imageUrls = src.split(";");
    if (!imageUrls) {
      console.warn("No progressive images to load, but dataset exists.");
      return;
    }

    const firstUrl = imageUrls.shift();
    if (!firstUrl) {
      console.warn(
        "No progressive images to load. Empty backround images data exists.",
      );
      return;
    }

    const promiseChain = (url) =>
      preloadImage(url)
        .catch((error) => {
          if (typeof onError === "function") onError(error);
          return false;
        })
        .then((image) => {
          if (!image) {
            return false;
          }
          if (typeof onSuccess === "function") onSuccess(url);
          return true;
        });

    const promise = promiseChain(firstUrl);

    // load image by images one by one
    if (imageUrls.length) {
      imageUrls.forEach((url) => {
        if (url) {
          promise.then(() => promiseChain(url));
        }
      });
    }
  }
};
