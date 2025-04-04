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
  const videoElement = document.createElement("video");
  videoElement.src = fileUrl;
  videoElement.controls = false;
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.loop = true;

  element.appendChild(videoElement);

  onSuccess();
};
