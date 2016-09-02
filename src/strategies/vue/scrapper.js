const CONFIG = require('./index.js')

function strategy () {
  return new Promise(function (resolve, reject) {
    resolve([{
      title: CONFIG.title,
      cover: CONFIG.cover,
      author: CONFIG.author,
      level: 0,
      url: 'https://vuejs.org/api/'
    }])
  })
}

module.exports = strategy
