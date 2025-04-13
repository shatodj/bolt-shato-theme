// google mao overlay for layz backgound

// /* eslint-disable no-console */

export default (googleMapId, element, onSuccess) => {
  // Check if the element exists.
  if (!element) {
    console.warn("Embedded element not found.");
    return;
  }

  // crewate google map element
  //   <iframe
  //   width="600"
  //   height="450"
  //   style="border:0"
  //   loading="lazy"
  //   allowfullscreen
  //   referrerpolicy="no-referrer-when-downgrade"
  //   src="https://www.google.com/maps/embed/v1/place?key=API_KEY
  //     &q=Space+Needle,Seattle+WA">
  // </iframe>

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=${googleMapId}&q=Space+Needle,Seattle+WA`;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.zIndex = "0";
  iframe.style.margin = "auto";
  iframe.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
  iframe.style.overflow = "hidden";
  iframe.style.border = "0";
  iframe.style.backgroundColor = "transparent";
  iframe.style.pointerEvents = "none"; // Disable pointer events
  iframe.style.opacity = "0.5"; // Set opacity to 0.5 for transparency
};
