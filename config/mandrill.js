'use strict'

module.exports = {
  // Mandrill API key
  key: process.env.MANDRILL_APIKEY,
  // Host name for sending eg. cal-style.com
  host: process.env.MANDRILL_HOST,
  // Protocol for sending eg. https or http
  protocol: process.env.MANDRILL_PROTOCOL,
  // The ReplyTo field in Mandrill templates
  replyTo: process.env.MANDRILL_REPLYTO
}
