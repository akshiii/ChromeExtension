console.log("ClipBoard");

let text = "";
let clearClipbard = false;
document.addEventListener("keydown", async function copyToClipBoard(event) {
  console.log("Keydown ");
  if (event.ctrlKey && (event.key === "c" || event.key === "C")) {
    const clipboardContents = await navigator.clipboard.readText();
    console.log("Clipboard contents = ", clipboardContents);
    text = text == "" ? clipboardContents : text + "\n" + clipboardContents;

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
  } else if (event.ctrlKey && (event.key === "v" || event.key === "V")) {
    clearClipbard = true;
  }
});
