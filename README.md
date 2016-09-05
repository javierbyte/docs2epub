Get your favorite docs as ebooks!
Doc scrapper and ebook generator.

[![docs2epub](docs/og.jpg)](http://javier.xyz/docs2epub/)

# Library
List of precompiled ebooks created with docs2epub.

* React [[epub]](http://javier.xyz/docs2epub/download/react.epub) [stable]
* Lodash [[epub]](http://javier.xyz/docs2epub/download/lodash.epub) [stable]
* Sass [[epub]](http://javier.xyz/docs2epub/download/sass.epub) [beta]
* Underscore [[epub]](http://javier.xyz/docs2epub/download/underscore.epub) [beta]
* express [[epub]](http://javier.xyz/docs2epub/download/express.epub) [beta]
* angular2 [[epub]](http://javier.xyz/docs2epub/download/angular2.epub) [alpha]

# Generate your own ebook form docs
The objective of this tool is to be a ready to go documentation parser and ebook generator (from scraping documentation sites or markdown).

It has a central processing and epub generator based on [strategies](https://github.com/javierbyte/docs2epub/tree/master/src/strategies).

If you want to add your own ebook generator you'll have to add a 'strategy' to the the `/src/strategies/` dir that returns  a `docObj` object as described on [tocToArray.js](https://github.com/javierbyte/docs2epub/blob/master/src/tocToArray.js). And then require it on [run.js](https://github.com/javierbyte/docs2epub/blob/master/src/run.js#L3).

Then run
```
  node index.js --project <yourprojectid>
```

With `yourprojectid` being the key on the `run.js` require.

And you'll have your `.epub` on the `docs/downloads` directory!

Remember to add the original documentation licence. And feel free to open an issue here or create a PR if you want to add your generated ebook to the library.

# Features
* Pluggable system to add more documentation sources.
* Uses [epub-gen](https://github.com/cyrilis/epub-gen) tuned for code.

# Future improvements
* Easier and smarter way to add more documentation sources.
* Cronjob to auto-update library.

# Licence
MIT.
