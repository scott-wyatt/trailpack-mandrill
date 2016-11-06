'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {
    models: { },
    controllers: { },
    services: { }
  },
  config: {
    mandrill: {
      // Mandrill API key
      key: '-ynu-rQJlGEbvaKEIQS30w',
      // Host name for sending eg. cal-style.com
      host: 'cali-style.com',
      // Protocol for sending eg. https or http
      protocol: 'https',
      // The ReplyTo field in Mandrill templates
      replyTo: 'no_reply@cali-style.com'
    },
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('../')
      ]
    }
  }
}, smokesignals.FailsafeConfig)
