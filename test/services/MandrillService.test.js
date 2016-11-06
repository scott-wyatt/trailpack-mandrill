'use strict'

const assert = require('assert')

describe('api.services.MandrillService', () => {
  let MandrillService
  before(() => {
    MandrillService = global.app.services.MandrillService
  })
  describe('#ageMatch', () => {
    it('should return', () => {
      return MandrillService.sendTemplateMessage(
        // Template
        {

        },
        // Options
        {

        }
      ).then(res => {
        console.log(res)
        assert.equal(res.result.action, 'PASS')
      })
    })
  })
})
