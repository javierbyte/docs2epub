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

var _ = require('lodash')
var read = require('node-readability')
var cheerio = require('cheerio')

function htmlFilter (content) {
  var $ = cheerio.load(content)
  $('.hash-link').remove()
  $('.edit-page-link').remove()
  return $.html()
}

function resolveTocEl (tocEl) {
  return new Promise(function (resolve, reject) {
    console.log('READ', tocEl.url)
    read(tocEl.url, function (err, article) {
      console.log('READED', tocEl.url)

      if (err || !article) {
        reject(err)
        return
      }

      var title = article.title
      var content = htmlFilter(article.content)
      article.close()

      resolve(_.assign(tocEl, {
        result: {
          title: title,
          content: content
        }
      }))
    })
  })
}

function getContent (tocArray) {
  console.log('Get content')
  return new Promise(function (resolve, reject) {
    if (_.every(tocArray, toc => {
      return !toc.url || toc.result
    })) {
      resolve(tocArray)
      return
    }

    var toSearchContentKey = _.findKey(tocArray, toc => {
      return !(!toc.url || toc.result)
    })

    resolveTocEl(tocArray[toSearchContentKey]).then(res => {
      tocArray[toSearchContentKey] = res
      resolve(getContent(tocArray))
    }).catch(reject)
  })
}

function tocToArray (toc) {
  return new Promise(function (resolve, reject) {
    getContent(toc).then(res => {
      resolve(res)
    }).catch(reject)
  })
}

module.exports = tocToArray
