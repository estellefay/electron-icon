// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var {fsmonitor} = require('fsmonitor');
var {exec} = require('child_process');
const fs = require('fs');
var {dialog} = require('electron').remote
var filePath = __dirname + '/outputs';



// initialisation des dossiers
// creation des dossiers :
fs.promises.mkdir(filePath+'/android/mipmap-mdpi', { recursive: true }).catch(console.error);
fs.promises.mkdir(filePath+'/android/mipmap-hdpi', { recursive: true }).catch(console.error);
fs.promises.mkdir(filePath+'/android/mipmap-xhdpi', { recursive: true }).catch(console.error);
fs.promises.mkdir(filePath+'/android/mipmap-xxhdpi', { recursive: true }).catch(console.error);
fs.promises.mkdir(filePath+'/android/mipmap-xxxhdpi', { recursive: true }).catch(console.error);
fs.promises.mkdir(filePath+'/ios', { recursive: true }).catch(console.error);

// fsevent =>observe folder output
// => generate thumb
// const {exec} = require ('child_process');
var canvas
var ctx;
var image;
let startX;
let startY;
exec('node generator.js');

// chokidar ou fsmonitor

// lorsque on ajoute un fichier dans le filePath on générer les miniature
window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext('2d')
 
  // Chargement de l'image
  document.getElementById('getImg').addEventListener('click', evt => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'All Files', extensions: ['svg', 'png'] }
      ],
    }).then(result => {
      // Créer une nouvelle image
      var img = new Image();   // Crée un nouvel élément Image
      // Charger l'image
      img.onload = () => {
        image = img ;
        // relancer le reload
        reload()
      }
      // Ajouter l'image importer
      img.src = result.filePaths
    }).catch(err => {
      console.log(err)
    })
  })

  // changement background color
  document.getElementById("primary_color").addEventListener('input', evt => {
    reload();
  }) 

  // zoom
  document.getElementById("zoom").addEventListener('input', evt => {
    reload();
  }) 
  // vertical
  document.getElementById("vertical").addEventListener('click', evt => {
    reload();
  }) 

  // horizontal
  document.getElementById("horizontal").addEventListener('click',evt => {
    reload();
  }) 

  // ecouter le save 
  
  document.getElementById("sendImg").addEventListener('click', evt => {
    let base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
    fs.writeFile(filePath+'/icon_1024x1024.png', base64Data, 'base64', err => {
      // exec('node generator.js'), (err, stdout, stderr) => {
      //   console.log(err)
      //   console.log(stdout)
      //   console.log(stderr)

      // }
    window.location.href = "winner.html"

    });

  }) 
});



  
  
  
  















  function reload() {
    // Selectionner le canvas
    // Nettoyer
    ctx.clearRect(0, 0, 1024, 1024)
    // Mettre un arrière pan
    ctx.fillStyle = getColor()
    // Définir la taille
    ctx.fillRect(0, 0, 1024, 1024)

    // Ajouter l'image
    if (image) {
    // Dessiner l'image
    const imgRatio = image.width / image.height;
    // startX = 0;
    // startY = 0;
    // Si portrait
    if (imgRatio < 1) {
      image.width = image.width * (ctx.canvas.height / image.height);
      image.height = ctx.canvas.height;
      //startX = (ctx.canvas.width / 2) - (image.width / 2);
    // Si paysage
    } else if (imgRatio > 1) {
      image.height = image.height * (ctx.canvas.width / image.width);
      image.width = ctx.canvas.width;
      //startY = (ctx.canvas.height / 2) - (image.height / 2);
    } else {
      image.width = ctx.canvas.width;
      image.height = ctx.canvas.height;
    }

    var zoom = document.getElementById("zoom");
    var horizontal = document.getElementById("horizontal");
    var vertical = document.getElementById("vertical");
    vertical = vertical.value
    horizontal = horizontal.value

    var scale = zoom.value;
    // Zoom
    var zh = image.height * scale
    var zw = image.width * scale

    // get vertical 
    var iY = (1024 - zh)/2
    // get horizontal
    var iX = (1024 - zw)/2

    iY = iY * vertical
    iX = iX * horizontal

    ctx.drawImage(image, iX, iY, zw, zh);
    
  } 

}
  
/**
 * Obtenir la couleur de l'arrière plan
 */
function getColor() {
var colorDiv =  document.getElementById("primary_color");
  return colorDiv.value;
}
