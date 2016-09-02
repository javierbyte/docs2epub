const _ = require('lodash')
const CONFIG = require('./index.js')

function strategy () {
  return new Promise(function (resolve, reject) {
    resolve(
      _.assign({}, CONFIG, {
        content: [{
          title: 'Sass',
          level: 0,
          url: 'http://sass-lang.com/documentation/file.SASS_REFERENCE.html'
        }]
      })
    )
  })
}

module.exports = strategy
