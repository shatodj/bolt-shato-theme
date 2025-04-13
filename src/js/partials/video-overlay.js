/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

export default (fileUrl, element, onSuccess) => {
  // Check if the element exists.
  if (!element) {
    console.warn("Embedded element not found.");
    return;
  }

  if (!fileUrl) {
    console.warn("Invalid Video File path");
    return;
  }

  // create video element
  const iframe = document.createElement("video");
  iframe.src = fileUrl;
  iframe.controls = false;
  iframe.autoplay = true;
  iframe.muted = true;
  iframe.loop = true;

  // Apply responsive styles
  iframe.style.width = "100%";
  iframe.style.height = "100%";

  element.appendChild(iframe);

  onSuccess();
};
