const tocToArray = require('./tocToArray')

const scrappers = {
  'react': require('./strategies/react/scrapper'),
  'react-native': require('./strategies/react-native/scrapper'),
  'lodash': require('./strategies/lodash/scrapper'),
  'underscore': require('./strategies/underscore/scrapper'),
  'vue': require('./strategies/vue/scrapper'),
  'express': require('./strategies/express/scrapper')
}

function run (strategyId) {
  return new Promise(function (resolve, reject) {
    scrappers[strategyId]().then(tocToArray).then(docArray => {
      resolve(docArray)
    }).catch(reject)
  })
}

module.exports = run
