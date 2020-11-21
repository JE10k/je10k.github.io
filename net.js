
let chatBox = document.querySelector(".chat-box");
let nick = "Joe";

function postMessage(text) {

    let newMsg = document.createElement("span");
    newMsg.textContent = `${nick}: ${text}`;
    newMsg.classList.add("chat__message");

    chatBox.appendChild(newMsg);

}