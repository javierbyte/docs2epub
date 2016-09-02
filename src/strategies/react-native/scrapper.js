const cheerio = require('cheerio')
const axios = require('axios')
const url = require('url')

const CONFIG = require('./index.js')

const DOCURL = 'https://facebook.github.io/react-native/docs/getting-started.html'

function reactStrategy () {
  return new Promise(function (resolve, reject) {
    axios.get(DOCURL)
    .then(res => {
      var $ = cheerio.load(res.data)
      var tocArray = []

      $('.nav-docs-section').each(function (index, el) {
        var parentName = $(el).find('h3').text()

        tocArray.push({
          title: parentName,
          level: 1
        })

        $(this).find('a').each(function (childIndex, childEl) {
          tocArray.push({
            parent: parentName,
            level: 2,
            title: $(childEl).text(),
            url: url.resolve(DOCURL, $(childEl).attr('href')).replace('/docs/docs', '/docs')
          })
        })
      })

      resolve([{
        title: CONFIG.title,
        level: 0
      }].concat(tocArray.slice(0, 3)))
    })
  })
}

module.exports = reactStrategy
