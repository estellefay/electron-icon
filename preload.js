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
      context = canvas.getContext('2d');
      // Créer une nouvelle image
      var img = new Image();   // Crée un nouvel élément Image
      // Ajouter l'image importer
      img.src = result.filePaths
      // Charger l'image
      img.onload = function(){
      context.drawImage(img, 0, 0);
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


