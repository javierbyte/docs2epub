Get your favorite docs as ebooks!

[![docs2epub](docs/og.jpg)](http://javier.xyz/docs2epub/)

# Library
* React [[epub]](http://javier.xyz/docs2epub/download/react.epub) [[html]](http://javier.xyz/docs2epub/download/react.html). [stable]
* Lodash [[epub]](http://javier.xyz/docs2epub/download/lodash.epub) [[html]](http://javier.xyz/docs2epub/download/lodash.html). [stable]
* Sass [[epub]](http://javier.xyz/docs2epub/download/sass.epub) [[html]](http://javier.xyz/docs2epub/download/sass.html). [beta]
* Underscore [[epub]](http://javier.xyz/docs2epub/download/underscore.epub) [[html]](http://javier.xyz/docs2epub/download/underscore.html). [beta]
* express [[epub]](http://javier.xyz/docs2epub/download/express.epub) [[html]](http://javier.xyz/docs2epub/download/express.html). [beta]
* angular2 [[epub]](http://javier.xyz/docs2epub/download/angular2.epub) [[html]](http://javier.xyz/docs2epub/download/angular2.html). [alpha]

# Create generate your own documentation
The objective of this tool is to be a ready to go documentation parser and ebook generator (from scraping documentation sites or markdown).

It has a central processing and epub generator based on [strategies](https://github.com/javierbyte/docs2epub/tree/master/src/strategies).

If you want to add your own ebook generator you'll have to add a 'strategy' to the the `/src/strategies/` dir that returns  a `docObj` object as described on [tocToArray.js](https://github.com/javierbyte/docs2epub/blob/master/src/tocToArray.js). And then require it on [run.js](https://github.com/javierbyte/docs2epub/blob/master/src/run.js).

Then run
```
  node index.js --project <yourprojectid>
```

With `yourprojectid` being the key on the `run.js` require.

# Features
* Pluggable system to add more documentation sources.
* Uses [epub-gen](https://github.com/cyrilis/epub-gen) tuned for code.

# Future improvements
* Syntax highlight.

# Licence
MIT.
