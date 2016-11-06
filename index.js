'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')

module.exports = class MandrillTrailpack extends Trailpack {

  /**
   * Validate mandrill
   */
  validate () {
    return Promise.all([
      lib.Validator.validateConfig(this.app.config.mandrill)
    ])
  }

  // /**
  //  * TODO document method
  //  */
  // configure () {
  //
  // }
  //
  // /**
  //  * TODO document method
  //  */
  // initialize () {
  //
  // }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
