const tocToArray = require('./tocToArray')

const strategies = {
  react: require('./strategies/react')
}

function run (strategyId) {
  return new Promise(function (resolve, reject) {
    strategies[strategyId]().then(tocToArray).then(docArray => {
      resolve(docArray)
    }).catch(reject)
  })
}

module.exports = run
