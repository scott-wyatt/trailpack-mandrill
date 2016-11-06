# trailpack-mandrill

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

### Trailpack for Mandrill
Send Mandrill Templates and emails as a service.

## Install

```sh
$ npm install --save trailpack-mandrill
```
With yo:
```sh
$ yo trails:trailpack trailpack-mandrill
```

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-mandrill')
  ]
}
```

## Examples



[npm-image]: https://img.shields.io/npm/v/trailpack-mandrill.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-mandrill
[ci-image]: https://img.shields.io/travis/scott-wyatt/trailpack-mandrill/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/scott-wyatt/trailpack-mandrill
[daviddm-image]: http://img.shields.io/david/scott-wyatt/trailpack-mandrill.svg?style=flat-square
[daviddm-url]: https://david-dm.org/scott-wyatt/trailpack-mandrill
[codeclimate-image]: https://img.shields.io/codeclimate/github/scott-wyatt/trailpack-mandrill.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/scott-wyatt/trailpack-mandrill
