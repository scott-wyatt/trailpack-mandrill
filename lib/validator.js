const joi = require('joi')

const schemas = require('./schemas')

module.exports = {
  validateConfig (config) {
    if (!config) {
      return Promise.reject(new TypeError('config.mandrill not found'))
    }
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.mandrill, (err, value) => {
        if (err) return reject(new TypeError('config.mandrill: ' + err))

        return resolve(value)
      })
    })
  }
}
