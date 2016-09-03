var CONFIG = {
  title: 'React',
  author: 'Facebook',
  cover: './src/strategies/react/cover.jpg',

  epubStylesheet: './src/strategies/react/epub.css',
  epubTOCDepth: 1,

  docsUrl: 'https://facebook.github.io/react/docs/getting-started.html',
  repoUrl: 'https://github.com/facebook/react',
  licenceUrl: 'https://raw.githubusercontent.com/facebook/react/master/LICENSE-docs',

  type: 'MARKDOWN',
  cleanHtml: require('./clean')
}

module.exports = CONFIG
