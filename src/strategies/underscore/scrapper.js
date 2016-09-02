const _ = require('lodash')
const CONFIG = require('./index.js')

function strategy () {
  return new Promise(function (resolve, reject) {
    resolve(
      _.assign({}, CONFIG, {
        content: [{
          title: 'Underscore',
          level: 0,
          url: 'http://underscorejs.org/'
        }]
      })
    )
  })
}

module.exports = strategy
