'use strict'

const assert = require('assert')

describe('api.services.MandrillService', () => {
  let MandrillService
  before(() => {
    MandrillService = global.app.services.MandrillService
  })
  describe('#sendTemplateMessage', () => {
    it('should return a response from mandrill', () => {
      return MandrillService.sendTemplateMessage(
        // Template
        {
          to: [{
            email: 'no_reply@cali-style.com',
            name: 'Dear friend',
            type: 'to'
          }]
        },
        // Options
        {
          template_name: 'index'
        }
      ).then(res => {
        console.log(res)
        assert.equal(res[0].email, 'no_reply@cali-style.com')
      })
    })
  })
})
