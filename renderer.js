// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var colorButton = document.getElementById("primary_color");
var colorDiv = document.getElementById("color_val");
var colorDiv = document.getElementById("canvas");


    colorButton.onchange = function() {
        colorDiv.innerHTML = colorButton.value;
        colorDiv.style.color = colorButton.value;
        canvas.style.backgroundColor = colorButton.value;
    }
