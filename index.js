console.log("Starting chrome extension");
// navigator.serviceWorker.addEventListener("message", (event) => {
//   console.log(event.data.msg, event.data.url);
// });

window.addEventListener("load", (event) => {
  let enableClipboard = document.getElementById("enable_clipboard");
  //Fetch from chrome's storage
  chrome.storage.local.get(["clipboard_enabled"]).then((result) => {
    console.log("Value is " + result.key);
    if (result.key?.enable_clipboard) {
      result.key.enable_clipboard
        ? (enableClipboard.checked = true)
        : (enableClipboard.checked = false);
    }
  });
  enableClipboard.addEventListener("change", onCheckboxToggle);
});

function onCheckboxToggle(event) {
  console.log("on checkbox change = ", event.target.checked);
  //Store in chrome's storage
  chrome.storage.local.set({
    clipboard_enabled: event.target.checked,
  });

  navigator.serviceWorker.ready.then((registration) => {
    console.log("Sending msg");
    registration.active.postMessage({
      enable_clipboard: event.target.checked,
    });
  });
}
