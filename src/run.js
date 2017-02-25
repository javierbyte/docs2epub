const tocToArray = require('./tocToArray')

const strategies = {
  'react': require('./strategies/react/scrapperMd'),
  'apolloreact': require('./strategies/apollo-react/scrapperMd'),
  'lodash': require('./strategies/lodash/scrapperMd'),
  'underscore': require('./strategies/underscore/scrapper'),
  'express': require('./strategies/express/scrapper'),
  'angular2': require('./strategies/angular2/scrapper'),
  'sass': require('./strategies/sass/scrapperMd')
}

function run (strategyId) {
  return new Promise(function (resolve, reject) {
    strategies[strategyId]().then(tocToArray).then(docArray => {
      resolve(docArray)
    }).catch(reject)
  })
}

module.exports = run
