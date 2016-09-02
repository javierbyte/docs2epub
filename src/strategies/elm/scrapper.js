const _ = require('lodash')

const cheerio = require('cheerio')
const axios = require('axios')
const url = require('url')

const CONFIG = require('./index.js')

const DOCURL = 'http://elm-lang.org/docs'

function strategy () {
  return new Promise(function (resolve, reject) {
    axios.get(DOCURL)
    .then(res => {

      console.log({res})

      var $ = cheerio.load(res.data)
      var tocArray = []

      $(this).find('.content').find('a').each(function (childIndex, childEl) {
        tocArray.push({
          level: 1,
          title: $(childEl).text(),
          url: url.resolve(DOCURL, $(childEl).attr('href'))
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
