'use strict'
/* global describe, it */
const assert = require('assert')

describe('MandrillService', () => {
  it('should exist', () => {
    assert(global.app.api.services['MandrillService'])
    assert(global.app.services['MandrillService'])
    assert(global.app.services['MandrillService'].sendTemplateMessage)
  })
})
