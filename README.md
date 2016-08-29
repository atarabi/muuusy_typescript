# TypeScript Sample


## Overview

Sample SPA for Typescript.  

- TypeScript, Babel(ES6), webpack(CommonJS)
- TDD by Mocha, Power-Assert, Sinon


## Usage

```
$ npm install
```

watch and server  

```
$ gulp
```

distribution  

```
$ gulp dist
```


## HTML

assets

```javascript
templates/
  _partiales/...
  index.html
  top/index.html
  top/samplePage.html
```

dist

```javascript
index.html
top/index.html
top/samplePage.html
```


## CSS

assets

```javascript
styl/
  _common/...
  index/...
  top/...
  samplePage/...
```

dist

```javascript
css/
  index/index.css
  top/index.css
  samplePage/index.css
```

## JS

assets

```javascript
js/
  _module/
    common/...
    fn/...
    lib/...
    model/...
    ui/...
    utils/...
    view/...
  index.js
  top.js
  samplePage.js
```

dist

```javascript
js/
  index.js
  top.js
  samplePage.js
```

## IMG

assets

```javascript
img/
  common/...
  index/...
  samplePage/...
_imgSprites/...
```

dist

```javascript
img/
  common/sprites.png
  index/...
  samplePage/...
```


### Tasks

```
$ gulp clean
$ gulp copy
$ gulp ejs
$ gulp html
$ gulp script
$ gulp server
$ gulp sprite
$ gulp style
```

### Tools

- [TypeScript](https://www.typescriptlang.org/index.html)
- [HTMLHint](http://htmlhint.com/)
- [JSHint](http://jshint.com/)
- [Stylus](https://learnboost.github.io/stylus/)
- [EJS](http://www.embeddedjs.com/)
- [Babel](https://babeljs.io/)
- [Webpack](http://webpack.github.io/)
- [Karma](https://karma-runner.github.io/0.13/index.html)
- [PhantomJS](http://phantomjs.org/)
- [Mocha](http://mochajs.org/)
- [PowerAssert](https://github.com/power-assert-js/power-assert)
- [Sinon](http://sinonjs.org/)
