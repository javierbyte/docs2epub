var express = require('express')
var app = express()

var run = require('./src/run')

var _ = require('lodash')
var epub = require('epub-gen')

function getHtml (tocArray) {
  return _.map(tocArray, tocEl => {
    if (tocEl.result) {
      return `
        <article>
          <h3>${tocEl.result.title}</h3>
          <div>${tocEl.result.content}</div>
        </article>
      `
    }

    if (tocEl.level === 0) return `<h1>${tocEl.title}</h1>`
    if (tocEl.level === 1) return `<h2>${tocEl.title}</h2>`

    return ''
  }).join('')
}

function getEpubOptions (tocArray) {
  return {
    title: tocArray[0].title,
    author: '', // *Required, name of the author.
    content: _.chain(tocArray).filter(el => el.result).map(tocEl => {
      return {
        title: tocEl.title,
        data: tocEl.result ? tocEl.result.content : ''
      }
    }).value()
  }
}

app.get('/', function (req, res) {
  run('react').then(results => {
    var epubOptions = getEpubOptions(results)

    console.log(epubOptions)

    new epub(epubOptions, 'epub/react.epub')
    res.send(getHtml(results))
  }).catch(err => {
    console.log(err.stack)
    res.send(err)
  })
})

console.log('\nRunning on port 3000')
app.listen(3000)
