console.log("Hello");
console.log(chrome);
chrome.runtime.onInstalled.addListener(() => {
  console.log("Instaalled");
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
