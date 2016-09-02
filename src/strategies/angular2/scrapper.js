const _ = require('lodash')

const cheerio = require('cheerio')
const axios = require('axios')
const url = require('url')

const CONFIG = require('./index.js')

const DOCURL = 'https://angular.io/docs/ts/latest/quickstart.html'

function strategy () {
  return new Promise(function (resolve, reject) {
    axios.get(DOCURL)
    .then(res => {
      var $ = cheerio.load(res.data)
      var tocArray = []

      $('.nav-blocks').each(function (index, el) {
        var parentName = $(el).find('nav-title').first().text()

        if (parentName === 'API Reference') return

        tocArray.push({
          title: parentName,
          level: 1
        })

        $(this).find('.nav-unordered-lists a').each(function (childIndex, childEl) {
          tocArray.push({
            parent: parentName,
            level: 2,
            title: $(childEl).text(),
            url: url.resolve(DOCURL, $(childEl).attr('href'))
          })
        })

        $(this).find('.nav-ordered-lists a').each(function (childIndex, childEl) {
          tocArray.push({
            parent: parentName,
            level: 2,
            title: $(childEl).text(),
            url: url.resolve(DOCURL, $(childEl).attr('href'))
          })
        })
      })

      resolve(
        _.assign({}, CONFIG, {
          content: tocArray
        })
      )
    })
  })
}

module.exports = strategy
