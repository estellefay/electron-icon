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
       function (files) {
        if (files !== undefined) {
            // handle files
        }}
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


