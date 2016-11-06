'use strict'

const mandrill = require('mandrill-api/mandrill')
const _ = require('lodash')
const Service = require('trails-service')
const joi = require('joi')
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
        name: 'base',
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
   * @method sendTemplateMessage sends a templated message
   * @param {Object} message the message
   * @param {Object} options the options for the message
   * @returns Promise
   */

  sendTemplateMessage(message, options) {
    return new Promise((resolve, reject) => {

      const schema = joi.object().keys({
        to: joi.array().required(),
        global_merge_vars: joi.array(),
        recipient_metadata: joi.array()
      }).unknown()

      joi.validate(message, schema, (err, value) => {
        if (err) {
          return reject(err)
        }

        message = _.defaults(message, this._baseMessage())
        const templateContent = _.defaults(options.template_content, this._baseTemplateContent())

        const params = {
          'template_name': options.template_name,
          'template_content': templateContent, // fill all mc:edit
          'message': message
        }

        this._api().messages.sendTemplate(params, function(res) {
          return resolve(res)
        }, function(err) {
          return reject(err)
        })

      })
    })
  }
}
