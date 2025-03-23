/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

/**
 * Create Embedded video iframe from youtube video
 */
export default (url, element) => {
  // Check if the element exists.
  if (!element) {
    console.warn("Embedded element not found.");
    return;
  }

  if (!url) {
    console.warn("Invalid Youtube Video URL");
    return;
  }

  // Extract video ID from URL
  const videoId = new URL(url).searchParams.get("v");
  if (!videoId) {
    console.error("Invalid YouTube URL");
    return;
  }

  // Create iframe element
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&mute=1&playsinline=1&loop=1&rel=0&showinfo=0&modestbranding=1`;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allow", "autoplay; modestbranding; encrypted-media");
  iframe.setAttribute("allowfullscreen", "");

  // Apply responsive styles
  iframe.style.width = "100%";
  iframe.style.height = "100%";

  // Create wrapper div for responsiveness
  const wrapper = document.createElement("div");
  wrapper.style.height = "100%";
  wrapper.style.width = "100%";
  wrapper.style.position = "absolute";
  wrapper.style.margin = "auto";
  wrapper.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
  wrapper.style.overflow = "hidden";

  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";

  // Append iframe to wrapper
  wrapper.appendChild(iframe);

  // Append to body or any specific element
  element.appendChild(wrapper);
};
