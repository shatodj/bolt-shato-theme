// google mao overlay for layz backgound

/* eslint-disable no-console */

export default (mapyczId, element, onSuccess) => {
  // Check if the element exists.
  if (!element) {
    console.warn("Embedded element not found.");
    return;
  }

  // <iframe style="border:none" src="https://mapy.com/s/lunavukufu" width="400" height="280" frameborder="0"></iframe>
  if (!mapyczId) {
    console.warn("Invalid Mapy.cz ID");
    return;
  }

  // Create iframe element
  const iframe = document.createElement("iframe");
  iframe.src = `https://mapy.com/s/${mapyczId}`;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("width", "100%");
  iframe.setAttribute("height", "100%");

  // Apply responsive styles
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  element.appendChild(iframe);

  onSuccess();
};
