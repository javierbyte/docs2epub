var run = require('./src/run')

var _ = require('lodash')
var epub = require('epub-gen')
var fs = require('fs')

const tocObjToHtml = require('./src/tocObjToHtml')

function getEpubOptions (tocObj) {
  return {
    title: tocObj.title,
    cover: tocObj.cover,
    author: tocObj.author,
    css: 'code,pre{font-size: 0.9em;background:#fafafa;padding:0.5em;display:block;margin:0.5rem 0}',
    content: _.chain(tocObj.content).filter(el => el.result).map(tocEl => {
      return {
        title: tocEl.title,
        data: tocEl.result ? tocEl.result.content : ''
      }
    }).value()
  }
}

var strategyToRun = 'react'

run(strategyToRun).then(tocArray => {
  var epubOptions = getEpubOptions(tocArray)
  new epub(epubOptions, 'docs/download/' + strategyToRun + '.epub')
  fs.writeFile('docs/download/' + strategyToRun + '.html', tocObjToHtml(tocArray), (err, res) => {
    console.log({err, res})
  })
}).catch(err => {
  console.log(err.stack)
})
