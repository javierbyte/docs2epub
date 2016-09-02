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

var getAboutPage = require('./getAboutPage')

function htmlSafe (content) {
  var $ = cheerio.load(content)

  var elToRemove = [
    'script'
  ]

  _.forEach(elToRemove, el => $(el).remove())

  return $.html()
}

function resolveTocEl (tocEl, tocObj) {
  var cleanHtml = tocObj.cleanHtml || function (noop) {
    return noop
  }

  return new Promise(function (resolve, reject) {
    read(tocEl.url, function (err, article) {
      console.log('READED', tocEl.url)

      if (err || !article) {
        reject(err)
        return
      }

      var title = article.title
      var content = htmlSafe(cleanHtml(article.content))

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

function getContent (tocContent, tocObj) {
  return new Promise(function (resolve, reject) {
    if (_.every(tocContent, toc => {
      return !toc.url || toc.result
    })) {
      resolve(tocContent)
      return
    }

    var toSearchContentKey = _.findKey(tocContent, toc => {
      return !(!toc.url || toc.result)
    })

    resolveTocEl(tocContent[toSearchContentKey], tocObj).then(res => {
      tocContent[toSearchContentKey] = res
      resolve(getContent(tocContent, tocObj))
    }).catch(reject)
  })
}

function tocToArray (toc) {
  return new Promise(function (resolve, reject) {
    getContent(toc.content, toc).then(res => {
      resolve(_.assign({}, toc, {
        content: [getAboutPage(toc)].concat(res)
      }))
    }).catch(reject)
  })
}

module.exports = tocToArray
