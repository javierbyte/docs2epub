const axios = require('axios')
const _ = require('lodash')
const async = require('async')

const CONFIG = require('./index.js')

var docList = [{
  title: 'Getting started',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/getting-started.md'
}, {
  title: 'Tutorial',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/tutorial.md'
}, {
  title: 'Thinking in react',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/thinking-in-react.md'
}, {
  title: 'Why react',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/01-why-react.md'
}, {
  title: 'Displaying data',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/02-displaying-data.md'
}, {
  title: 'JSX in depth',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/02.1-jsx-in-depth.md'
}, {
  title: 'JSX spread',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/02.2-jsx-spread.md'
}, {
  title: 'JSX gotchas',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/02.3-jsx-gotchas.md'
}, {
  title: 'Interactivity and dynamic uis',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/03-interactivity-and-dynamic-uis.md'
}, {
  title: 'Multiple components',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/04-multiple-components.md'
}, {
  title: 'Reusable components',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/05-reusable-components.md'
}, {
  title: 'Transferring props',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/06-transferring-props.md'
}, {
  title: 'Forms',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/07-forms.md'
}, {
  title: 'Working with the browser',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/08-working-with-the-browser.md'
}, {
  title: 'More about refs',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/08.1-more-about-refs.md'
}, {
  title: 'Tooling integration',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/09-tooling-integration.md'
}, {
  title: 'Language tooling',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/09.1-language-tooling.md'
}, {
  title: 'Package management',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/09.2-package-management.md'
}, {
  title: 'Environments',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/09.3-environments.md'
}, {
  title: 'Addons',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10-addons.md'
}, {
  title: 'Animation',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.1-animation.md'
}, {
  title: 'Form input binding sugar',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.2-form-input-binding-sugar.md'
}, {
  title: 'Class name manipulation',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.3-class-name-manipulation.md'
}, {
  title: 'Test utils',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.4-test-utils.md'
}, {
  title: 'Clone with props',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.5-clone-with-props.md'
}, {
  title: 'Create fragment',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.6-create-fragment.md'
}, {
  title: 'Update',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.7-update.md'
}, {
  title: 'Pure render mixin',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.8-pure-render-mixin.md'
}, {
  title: 'Perf',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.9-perf.md'
}, {
  title: 'Shallow compare',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/10.10-shallow-compare.md'
}, {
  title: 'Advanced performance',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/11-advanced-performance.md'
}, {
  title: 'Context',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/12-context.md'
}, {
  title: 'Top level api',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-01-top-level-api.md'
}, {
  title: 'Component api',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-02-component-api.md'
}, {
  title: 'Component specs',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-03-component-specs.md'
}, {
  title: 'Tags and attributes',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-04-tags-and-attributes.md'
}, {
  title: 'Events',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-05-events.md'
}, {
  title: 'Dom differences',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-06-dom-differences.md'
}, {
  title: 'Special non dom attributes',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-07-special-non-dom-attributes.md'
}, {
  title: 'Reconciliation',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-08-reconciliation.md'
}, {
  title: 'Webcomponents',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-09-webcomponents.md'
}, {
  title: 'Glossary',
  url: 'https://raw.githubusercontent.com/facebook/react/master/docs/docs/ref-10-glossary.md'
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
          .replace(/\]\(\/react\/img/g, '](https://raw.githubusercontent.com/facebook/react/master/docs/img')
          .replace(/<iframe.*src="(.*?)".*iframe>/, 'See [$1]($1)')
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
