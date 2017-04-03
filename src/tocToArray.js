/*
We should return a "dobObj" object, that looks like this:

{
  title: 'React', // name
  author: 'Facebook', // author
  cover: './src/strategies/react/cover.jpg', // cover url, relative or absolute

  epubStylesheet: './src/strategies/react/epub.css', // custom css url
  epubTOCDepth: 1,

  docsUrl: 'https://facebook.github.io/react/docs/getting-started.html',
  repoUrl: 'https://github.com/facebook/react',
  licenceUrl: 'https://raw.githubusercontent.com/facebook/react/master/LICENSE-docs',

  type: 'MARKDOWN', // MARKDOWN or HTML
  content: [{
    title: 'something',
    url: 'http://javier.xyz'
  }]
}

The `content.url` property should be either a html website (server side rendering) or a markdown file.
Remember to specify a `type` `MARKDOWN` o `HTML`.
*/

var _ = require('lodash');
var read = require('node-readability');
var cheerio = require('cheerio');

var getAboutPage = require('./getAboutPage');

function htmlSafe(content) {
  var $ = cheerio.load(content);

  var elToRemove = ['script'];

  _.forEach(elToRemove, el => $(el).remove());

  return $.html();
}

function resolveTocEl(tocEl, tocObj) {
  var cleanHtml = tocObj.cleanHtml ||
    function(noop) {
      return noop;
    };

  return new Promise(function(resolve, reject) {
    read(tocEl.url, function(err, article) {
      console.log('READED', tocEl.url);

      console.log(article.content);

      if (err || !article) {
        reject(err);
        return;
      }

      var title = article.title;
      var content = htmlSafe(cleanHtml(article.content));

      article.close();

      resolve(
        _.assign(tocEl, {
          result: {
            title: title,
            content: content
          }
        })
      );
    });
  });
}

function getContent(tocContent, tocObj) {
  return new Promise(function(resolve, reject) {
    if (
      _.every(tocContent, toc => {
        return !toc.url || toc.result;
      })
    ) {
      resolve(tocContent);
      return;
    }

    var toSearchContentKey = _.findKey(tocContent, toc => {
      return !(!toc.url || toc.result);
    });

    resolveTocEl(tocContent[toSearchContentKey], tocObj)
      .then(res => {
        tocContent[toSearchContentKey] = res;
        resolve(getContent(tocContent, tocObj));
      })
      .catch(reject);
  });
}

function tocToArray(toc) {
  return new Promise(function(resolve, reject) {
    getContent(toc.content, toc)
      .then(res => {
        resolve(
          _.assign({}, toc, {
            content: res
          })
        );
      })
      .catch(reject);
  });
}

module.exports = tocToArray;
