// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var colorButton = document.getElementById("primary_color");
var colorDiv = document.getElementById("color_val");
// var canvas = document.getElementById("canvas");

// var border = document.querySelectorAll('input[type=radio][name="border"]');
// context = canvas.getContext("2d");




    colorButton.onchange = function() {
        colorDiv.innerHTML = colorButton.value;
        colorDiv.style.color = colorButton.value;
        //canvas.style.backgroundColor = colorButton.value;
    }

//     function changeHandler(event) {
//         console.log(this.value);
//         if ( this.value === 'around' ) {
//             canvas.style.borderRadius = "20%";
//         } else if ( this.value === 'square' ) {
//             canvas.style.borderRadius = "0%";
//         }  else if ( this.value === 'circle' ) {
//             canvas.style.borderRadius = "100%";
//          } 
//      }
     
//      Array.prototype.forEach.call(border, function(border) {
//         border.addEventListener('change', changeHandler);
//      });


