import "./sw-omnibox.js";

//To store something in chrome's local storage - as servcie worker can access localstorage
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "storage", "scripting"],
    });
  }
});

//To add listener for incoming messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message is = ", message, sender);
  sendResponse("HI");
});

addEventListener("message", (event) => {
  console.log("Message received: ", event.data);
  if (event && event.data && event.data.enable_clipboard) {
  } else {
  }
});
