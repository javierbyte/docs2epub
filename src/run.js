const tocToArray = require('./tocToArray')

const scrappers = {
  'react': require('./strategies/react/scrapperMd'),
  'lodash': require('./strategies/lodash/scrapper'),
  'underscore': require('./strategies/underscore/scrapper'),
  'vue': require('./strategies/vue/scrapper'),
  'express': require('./strategies/express/scrapper'),
  'elm': require('./strategies/elm/scrapper'),
  'mobx': require('./strategies/mobx/scrapper'),
  'sass': require('./strategies/sass/scrapper'),
  'angular2': require('./strategies/angular2/scrapper'),
  'socketio': require('./strategies/socketio/scrapper')
}

function run (strategyId) {
  return new Promise(function (resolve, reject) {
    scrappers[strategyId]().then(tocToArray).then(docArray => {
      resolve(docArray)
    }).catch(reject)
  })
}

module.exports = run
