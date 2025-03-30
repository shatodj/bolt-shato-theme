/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

export default (fileUrl, element) => {
  // Check if the element exists.
  if (!element) {
    console.warn("Embedded element not found.");
    return;
  }

  if (!fileUrl) {
    console.warn("Invalid Youtube Video URL");
    return;
  }

  // create video element
  const videoElement = document.createElement("video");
  videoElement.src = fileUrl;
  videoElement.controls = false;
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.loop = true;

  // Apply responsive styling
  videoElement.style.width = "100%"; // Full width of the parent container
  videoElement.style.height = "auto"; // Maintain aspect ratio

  element.appendChild(videoElement);
};
