var express = require('express')
var app = express()

var read = require('node-readability')

app.get('/', function (req, res) {
  read('https://expressjs.com/en/4x/api.html', function (err, article) {
    if (err) return console.error(err)

    console.log(article.content)
    console.log(article.title)
    console.log(article.document)
    article.close()

    res.send('<h1>' + article.title + '</h1>' + article.content)
  })
})

app.listen(3000)

/*

read('https://facebook.github.io/react/docs/getting-started.html', function(err, article, meta) {
  // Main Article
  console.log(article.content);
  // Title
  console.log(article.title);

  // HTML Source Code
  console.log(article.html);
  // DOM
  console.log(article.document);

  // Response Object from Request Lib
  console.log(meta);

  // Close article to clean up jsdom and prevent leaks
  article.close();
});
*/
