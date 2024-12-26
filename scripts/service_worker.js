import "./sw-omnibox.js";

console.log("Hello");

//To store something in chrome's local storage - as servcie worker can access localstorage
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "storage", "scripting"],
    });
  }
});
