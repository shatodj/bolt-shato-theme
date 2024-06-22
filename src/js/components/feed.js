import "../../scss/components/feed.scss";

export default ({ selector }) => {
  const feedItems = document.querySelectorAll(selector);

  feedItems.forEach((feedItem) => {
    const readMoreElement = document.createElement("a");
    readMoreElement.classList.add("feed-read-more");
    readMoreElement.addEventListener("click", () => {
      feedItem.querySelector(".feed-excerpt")?.classList.add("is-hidden");
      feedItem
        .querySelector(".feed-content-full")
        ?.classList.remove("is-hidden");

      readMoreElement.remove();
    });

    const textNode = document.createTextNode("Read more");
    readMoreElement.appendChild(textNode);
    feedItem.parentElement.appendChild(readMoreElement);
  });
};
