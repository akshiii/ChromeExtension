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

addEventListener("message", async (event) => {
  console.log("Message received: ", event.data);
  if (event && event.data && event.data.enable_clipboard != null) {
    sendMessageToActiveTab(event.data.enable_clipboard);
  }
});

async function sendMessageToActiveTab(enable_clipboard) {
  const tab = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  console.log("tabid  = ", tab);
  const response = await chrome.tabs.sendMessage(tab[0].id, {
    enable_clipboard: enable_clipboard,
  });
  console.log("Response = ", response);
  // TODO: Do something with the response.
}

//To send msg to content scripts on all tabs
// chrome.tabs.onActivated.addEventListener((tab) => {
//   console.log("tab = ", tab);

// });

chrome.runtime.sendMessage("hello from service worker");
