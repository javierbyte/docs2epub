const axios = require('axios')
const _ = require('lodash')
const async = require('async')

const CONFIG = require('./index.js')

var docList = [{
  title: 'Index',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/index.md'
}, {
  title: 'Initialization',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/initialization.md'
}, {
  title: 'Higher Order Components',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/higher-order-components.md'
}, {
  title: 'Example Schema',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/example-schema.md'
}, {
  title: 'Queries',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/queries.md'
}, {
  title: 'Mutations',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/mutations.md'
}, {
  title: 'Receiving Updates',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/receiving-updates.md'
}, {
  title: 'Cache Updates',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/cache-updates.md'
}, {
  title: 'Auth',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/auth.md'
}, {
  title: 'Pagination',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/pagination.md'
}, {
  title: 'Optimistic UI',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/optimistic-ui.md'
}, {
  title: 'Fragments',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/fragments.md'
}, {
  title: 'Prefetching',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/prefetching.md'
}, {
  title: 'React Native',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/react-native.md'
}, {
  title: 'Redux',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/redux.md'
}, {
  title: 'Webpack',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/webpack.md'
}, {
  title: 'Server Side Rendering',
  url: 'https://raw.githubusercontent.com/apollographql/react-docs/master/source/server-side-rendering.md'
}]

docList = _.map(docList, (el, idx) => {
  el.index = ('000' + idx).slice(-3)
  return el
})

function requestUrl (doc, cb) {
  axios.get(doc.url).then(res => {
    console.log('READED', doc.url)
    cb(null, _.assign({}, doc, {
      result: {
        title: doc.title,
        content: `\n# ${doc.title}\n\n` + res.data
          // .replace(/\]\(\/react\/img/g, '](https://raw.githubusercontent.com/facebook/react/master/docs/img')
      }
    }))
  }, (err) => {
    cb(err)
  })
}

function strategy () {
  return new Promise(function (resolve, reject) {
    async.map(docList, requestUrl, function (asyncErr, asyncRes) {
      if (asyncErr) {
        reject(asyncErr)
        return
      }

      resolve(
        _.assign({}, CONFIG, {
          content: asyncRes
        })
      )
    })
  })
}

module.exports = strategy
