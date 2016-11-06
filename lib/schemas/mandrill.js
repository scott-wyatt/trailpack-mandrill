'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  key: joi.string(),
  // Host name for sending eg. cal-style.com
  host: joi.string(),
  // Protocol for sending eg. https or http
  protocol: joi.string(),
  // The ReplyTo field in Mandrill templates
  replyTo: joi.string()
})
