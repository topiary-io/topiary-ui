# mithril-redux-malatium 

A custom Mithril + Redux starter, based on:  
* https://github.com/mijime/mithril-redux-starter-hmr
* https://github.com/colinbate/mithril-redux

Malatium includes the expected `connect`/`Provider` to interface with redux, but also has other utilities, like `Malatium.route`. 

Hopefully it will evolve to include any helpers I find useful in Mithril development.

## using modules

* [mithril](https://github.com/lhorie/mithril.js)
* [redux](https://github.com/rackt/redux)
* [malatium](https://github.com/schtauffen/malatium)
* [browserify-hmr](https://npmjs.com/package/browserify-hmr)
* [browserify](http://browserify.org)/[watchify](https://npmjs.com/package/watchify)
* [ud](https://github.com/AgentME/ud)

## quick start

```
$ npm install
$ npm run watch
$ open index.html
```

There is also a very simple static server available for use.

## commands

* `npm run build` - build js for production
* `npm run watch` - automatically build js on file changes for development
* `npm start` - start a static server
* `npm run dev` - runs both `watch` and `start`
