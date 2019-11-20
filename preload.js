// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var {fsmonitor} = require('fsmonitor');

var {dialog} = require('electron').remote
// fsevent =>observe folder output
// => generate thumb
// const {exec} = require ('child_process');
var canvas
var ctx;
var image;
let startX;
let startY;


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

  // j'écoute tous les inputs
  // a chaque changement je reload

  // changement background color
  document.getElementById("primary_color").addEventListener('input', evt => {
    reload();
  }) 

  // zoom
  document.getElementById("zoom").addEventListener('input', evt => {
    reload();
  }) 
// vertical
document.getElementById("vertical").addEventListener('input', evt => {
  reload();
}) 

// horizontal
document.getElementById("horizontal").addEventListener('input', evt => {
  reload();
}) 
  // border

  // save

  
});


// 
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
    
    console.log(image.src);
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

    // AJouter les bordures
}
  
/**
 * Obtenir la couleur de l'arrière plan
 */
function getColor() {
var colorDiv =  document.getElementById("primary_color");
  return colorDiv.value;
}

/**
 * Obtenir les bordures
 */
function getBorder() {
// TODO
}



/**
 * Obtenir l'image
 * @param
 *  ctx 
 */

  



  
// faire des param 
// param [
//   test () => document.getElementById("tot");

// ]

 // document.getElementById('getImg').addEventListener('click', evt => {
// lancer la fonction dès que un bouton est changer 



  //   dialog.showOpenDialog({
  //     properties: ['openFile', 'multiSelections'],
  //     filters: [
  //       { name: 'All Files', extensions: ['svg', 'png'] }
  //     ],
  //   }).then(result => {
  //     // console.log(result.canceled)
  //     console.log(result.filePaths)

  //     // Chercher le canva
  //     var canvas = document.getElementById("canvas"), 
  //     ctx = canvas.getContext('2d');

  //     // Remove canvas
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     // créer canva
  //     // ctx.fillStyle  = backgroung color
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);


  //     // Créer une nouvelle image
  //     var img = new Image();   // Crée un nouvel élément Image
  //     // Ajouter l'image importer
  //     img.src = result.filePaths
  //     // Charger l'image
  //     img.onload = () => {
  //       // Définir le ration à 0
  //       const imgRatio = img.width / img.height;
  //       let startX = 0;
  //       let startY = 0;
  //       // SI portrait
  //       if (imgRatio < 1) {
  //         img.width = img.width * (ctx.canvas.height / img.height);
  //         img.height = ctx.canvas.height;
  //         startX = (ctx.canvas.width / 2) - (img.width / 2);
  //       // Si paysage
  //       } else if (imgRatio > 1) {
  //         img.height = img.height * (ctx.canvas.width / img.width);
  //         img.width = ctx.canvas.width;
  //         startY = (ctx.canvas.height / 2) - (img.height / 2);
  //       } else {
  //         img.width = ctx.canvas.width;
  //         img.height = ctx.canvas.height;
  //       }
  //       ctx.drawImage(img, startX, startY, img.width, img.height);
  //     }


  //   }).catch(err => {
  //     console.log(err)
  //   })
  // })

  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // } 
  
  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }

  // save file