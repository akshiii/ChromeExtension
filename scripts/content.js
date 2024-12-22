console.log("content present");
const article = document.querySelector("article");

if (article) {
  console.log("Artile present", article);
  const text = article.textContent;

  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);

  const wordCount = [...words].length;
  console.log("words length", wordCount);

  const readingTime = Math.round(wordCount / 200);

  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️🥳 ${readingTime} min read`;

  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  heading?.insertAdjacentElement("afterend", badge);
}
