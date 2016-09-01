const cheerio = require('cheerio')
const axios = require('axios')
const url = require('url')

const DOCURL = 'https://facebook.github.io/react/docs/getting-started.html'

function reactStrategy () {
  return new Promise(function (resolve, reject) {
    axios.get(DOCURL)
    .then(res => {
      var $ = cheerio.load(res.data)
      var tmpObject = []

      $('.nav-docs-section').each(function (index, el) {
        var tocSection = {
          title: $(el).find('h3').text(),
          content: []
        }

        $(this).find('a').each(function (childIndex, childEl) {
          tocSection.content.push({
            title: $(childEl).text(),
            url: url.resolve(DOCURL, $(childEl).attr('href'))
          })
        })

        tmpObject.push(tocSection)
      })

      resolve({
        title: 'React',
        content: tmpObject
      })
    })
  })
}

module.exports = reactStrategy
