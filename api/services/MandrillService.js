/* eslint no-console: [0, { allow: ['log','warn', 'error'] }] */
'use strict'

const mandrill = require('mandrill-api/mandrill')
const _ = require('lodash')
const joi = require('joi')
const Service = require('trails-service')
// const lib = require('../../lib')

/**
 * @module MandrillService
 *
 * @description Mandrill Service to connect and send with the Mandrill API
 * @see {@link http://trailsjs.io/doc/api/services}
 * @this TrailsApp
 */

module.exports = class ManddrillService extends Service {

  _baseTemplateContent() {
    return [
      {
        name: 'domain',
        content: `${this.app.config.mandrill.protocol}://${this.app.config.mandrill.host}`
      }
    ]
  }
  /**
   * Base message object
   */
  _baseMessage() {
    return {
      important: true,
      headers: {
        'From-Address': this.app.config.mandrill.replyTo,
        'Reply-To': this.app.config.mandrill.replyTo
      }
    }
  }

  /**
   * Mandrill API
   */
  _api() {
    return new mandrill.Mandrill(this.app.config.mandrill.key)
  }

  /**
   * Mandrill Prevalidation
   */
  _validate(obj, schema) {
    return new Promise((resolve, reject) => {
      joi.validate(obj, schema, (err, value) => {
        if (err) {
          return reject(err)
        }
        resolve(value)
      })
    })
  }

  /**
   * @method sendTemplateMessage sends a templated message
   * @param {Object} message the message in Mandrill Format
   * @option message {Array} to
   * @option message {Array} global_merge_vars
   * @option message {Array} recipient_metadata
   * @param {Object} options the options for the message
   * @option options {String} template_name
   * @option options {Array} template_content
   * @returns Promise
   */

  sendTemplateMessage(message, options) {
    return new Promise((resolve, reject) => {
      // Setup defaults
      if (!options) {
        options = {}
      }
      // Construct the Message Schema
      const messageSchema = joi.object().keys({
        to: joi.array().min(1).required(),
        global_merge_vars: joi.array(),
        recipient_metadata: joi.array()
      }).unknown()

      // Construct the Options Schema
      const optionsSchema = joi.object().keys({
        template_name: joi.string().required(),
        template_content: joi.array()
      }).unknown()

      // Validate the Message
      this._validate(message, messageSchema)
      .then(value => {
      // Validate the Options
        return this._validate(options, optionsSchema)
      })
      .then(value => {

        // Add the Defaults
        const messageContent = _.defaults(message, this._baseMessage())
        const templateContent = _.defaults(options.template_content, this._baseTemplateContent())

        // Construct the Mandrill Message
        const params = {
          'template_name': options.template_name,
          'template_content': templateContent, // fill all mc:edit
          'message': messageContent
        }

        // Send Sessage Template
        this._api().messages.sendTemplate(params, function(res) {
          return resolve(res)
        }, function(err) {
          return reject(err)
        })
      })
      .catch(err => {
        return reject(err)
      })
    })
  }

  sendMessage(message, options) {
    return new Promise((resolve, reject) => {
      // Setup defaults
      if (!options) {
        options = {}
      }
      // Construct the Message Schema
      const messageSchema = joi.object().keys({
        subject: joi.string().required(),
        text: joi.string(),
        html: joi.string(),
        to: joi.array().min(1).required(),
        global_merge_vars: joi.array(),
        recipient_metadata: joi.array()
      }).unknown()

      // Construct the Options Schema
      const optionsSchema = joi.object().keys({
        template_content: joi.array()
      }).unknown()

      // Validate the Message
      this._validate(message, messageSchema)
      .then(value => {
      // Validate the Options
        return this._validate(options, optionsSchema)
      })
      .then(value => {

        // Add the Defaults
        const messageContent = _.defaults(message, this._baseMessage())
        const templateContent = _.defaults(options.template_content, this._baseTemplateContent())

        // Construct the Mandrill Message
        const params = {
          'template_content': templateContent, // fill all mc:edit
          'message': messageContent
        }

        // Send Message Template
        this._api().messages.send(params, function(res) {
          return resolve(res)
        }, function(err) {
          return reject(err)
        })
      })
      .catch(err => {
        return reject(err)
      })
    })
  }
}
