const _ = require('lodash')
const CONFIG = require('./index.js')

function strategy () {
  return new Promise(function (resolve, reject) {
    resolve(
      _.assign({}, CONFIG, {
        content: [{
          title: 'Express',
          level: 0,
          url: 'http://expressjs.com/en/api.html'
        }]
      })
    )
  })
}

module.exports = strategy
