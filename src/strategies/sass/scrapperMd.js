const axios = require('axios')
const _ = require('lodash')
const async = require('async')

const CONFIG = require('./index.js')

var docList = [{
  title: 'Sass reference',
  url: 'https://raw.githubusercontent.com/sass/sass/stable/doc-src/SASS_REFERENCE.md'
}, {
  title: 'Indented syntax',
  url: 'https://raw.githubusercontent.com/sass/sass/stable/doc-src/INDENTED_SYNTAX.md'
}, {
  title: 'SCSS for SASS Users',
  url: 'https://raw.githubusercontent.com/sass/sass/stable/doc-src/SCSS_FOR_SASS_USERS.md'
}, {
  title: 'FAQ',
  url: 'https://raw.githubusercontent.com/sass/sass/stable/doc-src/FAQ.md'
}, {
  title: 'Changelog',
  url: 'https://raw.githubusercontent.com/sass/sass/stable/doc-src/SASS_CHANGELOG.md'
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
