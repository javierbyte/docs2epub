const _ = require('lodash')

var getHtml = function (content) {
  return `
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700" rel="stylesheet">

    <style>
      body {
        font-family: 'Merriweather', serif;
        background: '#ddd';
        color: '#444';
        font-size: 17px;
        line-height: 1.75;
      }

      code, pre {
        font-family: 'monospace'
        font-size: 15px;
        background: #fafafa;
        padding: 0.5rem;
        margin: 0.5rem 0;
      }

      #main {
        max-width: 740px;
      }

      article {
        margin: 1em 0;
        padding: 1em;
      }
    </style>
  </head>
  <body>
    <div id="main">
      ${content}
    </div>
  </body>
</html>
  `
}

function tocObjToHtml (tocObj) {
  return getHtml(_.map(tocObj.content, tocEl => {
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
  }).join(''))
}

module.exports = tocObjToHtml
