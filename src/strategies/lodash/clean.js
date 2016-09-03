const _ = require('lodash')
var cheerio = require('cheerio')

function htmlFilter (content) {
  var $ = cheerio.load(content)

  var elToRemove = [
    '.hash-link',
    '.edit-page-link',
    '.want-to-skip-all-this-and-just-see-the-source'
  ]

  _.forEach(elToRemove, el => $(el).remove())

  return $.html()
}

module.exports = htmlFilter
