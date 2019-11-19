// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

var {dialog} = require('electron').remote
// fsevent =>observe folder output
// => generate thumb
// const {exec} = require ('child_process');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getImg').addEventListener('click', evt => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'All Files', extensions: ['svg', 'png'] }
      ],
    }).then(result => {
      // console.log(result.canceled)
      console.log(result.filePaths)

      // Chercher le canva
      var canvas = document.getElementById("canvas"), 
      ctx = canvas.getContext('2d');

      // Remove canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Créer une nouvelle image
      var img = new Image();   // Crée un nouvel élément Image
      // Ajouter l'image importer
      img.src = result.filePaths
      // Charger l'image
      img.onload = () => {
        // Définir le ration à 0
        const imgRatio = img.width / img.height;
        let startX = 0;
        let startY = 0;
        // SI portrait
        if (imgRatio < 1) {
          img.width = img.width * (ctx.canvas.height / img.height);
          img.height = ctx.canvas.height;
          startX = (ctx.canvas.width / 2) - (img.width / 2);
        // Si paysage
        } else if (imgRatio > 1) {
          img.height = img.height * (ctx.canvas.width / img.width);
          img.width = ctx.canvas.width;
          startY = (ctx.canvas.height / 2) - (img.height / 2);
        } else {
          img.width = ctx.canvas.width;
          img.height = ctx.canvas.height;
        }
        ctx.drawImage(img, startX, startY, img.width, img.height);
      }


    }).catch(err => {
      console.log(err)
    })
  })

  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // } 
  
  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }

  // save file
})


