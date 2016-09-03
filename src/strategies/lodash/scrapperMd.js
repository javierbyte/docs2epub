const axios = require('axios')
const _ = require('lodash')
const async = require('async')

const CONFIG = require('./index.js')

var docList = [{
  title: 'Lodash',
  url: 'https://raw.githubusercontent.com/lodash/lodash/master/doc/README.md'
}]

docList = _.map(docList, (el, idx) => {
  el.index = ('000' + idx).slice(-3)
  return el
})

function requestUrl (doc, cb) {
  axios.get(doc.url).then(res => {
    console.log('READED', doc.url)
    cb(null, _.assign({}, doc, {
      result: {
        title: doc.title,
        content: res.data
          .replace(/<br>/g, '\n')
          .replace(/\[&#x.*\[&#x24C9;\]\[1\]/g, '')
          .replace(/([^#]|^)#### /g, '\n\n\n#### ')
          .replace(/\n\n/g, '\n')
          .replace(/(## `.*?`)/g, '\n$1')
          .replace(/<h3/g, '<h2')
          .replace(/h3>/g, 'h2>')
      }
    }))
  }, (err) => {
    cb(err)
  })
}

function strategy () {
  return new Promise(function (resolve, reject) {
    async.map(docList, requestUrl, function (asyncErr, asyncRes) {
      if (asyncErr) {
        reject(asyncErr)
        return
      }

      resolve(
        _.assign({}, CONFIG, {
          content: asyncRes
        })
      )
    })
  })
}

module.exports = strategy
