const TAG = "clipboard::";

let text = "";
let clearClipbard = false;
async function copyToClipBoard(event) {
  console.log("Keydown ");
  if (event.ctrlKey && (event.key === "c" || event.key === "C")) {
    if (clearClipbard) {
      text = "";
    }
    const clipboardContents = await navigator.clipboard.readText();
    console.log("Clipboard contents = ", clipboardContents);
    text = text == "" ? clipboardContents : text + "\n" + clipboardContents;
    await navigator.clipboard.writeText(text);
  } else if (event.ctrlKey && (event.key === "v" || event.key === "V")) {
    try {
      console.log(TAG, "Text is: ", text);
      await navigator.clipboard.writeText(text);
      clearClipbard = true;
      chrome.runtime.sendMessage(
        { msgType: "paste_to_clipboard", msg: text },
        (response) => {
          console.log(TAG, "response is = ", response);
        }
      );
    } catch (error) {
      console.error(TAG, "Error while copying", error.message);
    }
  }
}

/*To send message to serrvice worker file*/
// chrome.runtime.sendMessage("hello bg page", (response) => {
//   console.log(TAG, "response is = ", response);
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message is = ", message, sender);
  if (message) {
    if (message.enable_clipboard)
      document.addEventListener("keydown", copyToClipBoard);
    else document.removeEventListener("keydown", copyToClipBoard);
  }
  sendResponse("HI");
});
