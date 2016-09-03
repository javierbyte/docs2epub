function htmlFilter (content) {
  return content.replace(/code-example/gi, 'code').replace(/code-pane/gi, 'code')
}

module.exports = htmlFilter
