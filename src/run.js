const reactStrategy = require('./strategies/react')

const tocToArray = require('./tocToArray')

reactStrategy().then(tocToArray).then(docArray => {
  console.warn(JSON.stringify(docArray))
})
