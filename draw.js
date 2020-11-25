const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");

const cursorCanvas = document.createElement("canvas");
const cursorCtx = cursorCanvas.getContext("2d");

let colourBtn = document.querySelector(".tool-container__colour-btn");
let penTool = document.querySelector(".toolbar__pen-tool");
let eraserTool = document.querySelector(".toolbar__eraser-tool");
let penSizeSlider = document.querySelector(".toolbar__size-slider");

let dialog = document.querySelector(".dialog");
let dialogBtnYes = document.querySelector(".dialog__btn-yes");
let dialogBtnNo = document.querySelector(".dialog__btn-no");
let cursor1 = document.querySelector(".cursor1");
let colourBoxes = document.getElementsByClassName("toolbar__colours__colour");
let pageClearButton = document.querySelector(".toolbar__page-funcs__new");
let pageSaveButton = document.querySelector(".toolbar__page-funcs__save");
let showCursor = true;

dialog.style.display = "none";


colourBtn.addEventListener("click", (e) => {
    console.log("Colour button clicked");
})


// Paint object
let draw = {

    colour: "black",
    palette: ["black", "white", "red", "blue", "green", "yellow", "orange", "brown", "purple", "gray"],
    tool: "pen",
    oldColour: "black",
    isPainting: false,
    cursorX: 0,
    cursorY: 0,
    clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); },

}

// Display paint colours and assign click event
for (let i = 0; i < colourBoxes.length; i++) {
    colourBoxes[i].style.backgroundColor = draw.palette[i];

    colourBoxes[i].addEventListener("click", function (e) {
        draw.colour = colourBoxes[i].style.backgroundColor;
    });
}

// Set isPainting to true when the user clicks on the canvas
canvas.addEventListener("mousedown", (e) => {
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.beginPath();
    draw.isPainting = true;
    showCursor = false;
    console.log("is painting");
});

// As above
canvas.addEventListener("pointerdown", (e) => {
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.beginPath();
    draw.isPainting = true;
    showCursor = false;
    console.log("is painting");
});


// Set isPainting to false when the user releases the mouse button
canvas.addEventListener("mouseup", (e) => {
    draw.isPainting = false;
    showCursor = true;
    ctx.closePath();
    console.log("Isn't painting");
});

// As above
canvas.addEventListener("pointerup", (e) => {
    draw.isPainting = false;
    showCursor = true;
    ctx.closePath();
    console.log("Isn't painting");
});

// Update cursor coords to current mouse position
canvas.addEventListener("mousemove", function (e) {
    [draw.cursorX, draw.cursorY] = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop];
    drawPixels();
});

canvas.addEventListener("pointermove", function (e) {
    [draw.cursorX, draw.cursorY] = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop];
    drawPixels();
});

// Stop drawing / close draw path when mouse leaves canvas
canvas.addEventListener("mouseleave", (e) => {
    draw.isPainting = false;

});

// Display dialog when user clicks 'New' button
pageClearButton.addEventListener("click", (e) => {

    dialog.style.display = "grid";
});

// Clear screen when user clicks dialog 'Yes' button
dialogBtnYes.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    dialog.style.display = "none";
    console.log("Cleared canvas");

});

// Close dialog when user clicks dialog 'No' button
dialogBtnNo.addEventListener("click", (e) => {
    dialog.style.display = "none";
});

// Set pen colour to white on Eraser button click (cheat!)
eraserTool.addEventListener("click", () => {
    draw.oldColour = draw.colour;
    draw.colour = "white";
});


// Set pen colour to black on pen button click (cheat!)
penTool.addEventListener("click", () => {
    draw.colour = draw.oldColour;
});


// Draw user input to canvas
function drawPixels() {

    if (draw.isPainting) {

        ctx.strokeStyle = draw.colour;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = penSizeSlider.value;
        ctx.lineTo(draw.cursorX, draw.cursorY);
        ctx.stroke();

    }
}
