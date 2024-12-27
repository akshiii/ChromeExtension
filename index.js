console.log("Thisboo");
// navigator.serviceWorker.addEventListener("message", (event) => {
//   console.log(event.data.msg, event.data.url);
// });

window.addEventListener("load", (event) => {
  let enableClipboard = document.getElementById("enable_clipboard");
  enableClipboard.addEventListener("change", onCheckboxToggle);
});

function onCheckboxToggle(event) {
  console.log("on checkbox change = ", event.target.checked);

  navigator.serviceWorker.ready.then((registration) => {
    console.log("Sending msg");
    registration.active.postMessage({
      enable_clipboard: event.target.checked,
    });
  });
}
