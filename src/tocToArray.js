/*
We should return a "toc" object, that looks like this:

{
  title: 'react',
  content: [{
    title: 'something',
    url: 'http://javier.xyz'
  }]
}
*/

var read = require('node-readability')

function solve (tocEl) {
  if (tocEl.children) {

  }
}

function tocToArray (toc) {
  return new Promise(function (resolve, reject) {
    resolve(toc)
  })
}

module.exports = tocToArray
