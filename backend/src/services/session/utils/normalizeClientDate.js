'use strict'

const moment = require('moment')

module.exports = function getNormalizedDate (rawDate) {
  
    if (!rawDate) {
      return moment()
    }
    
    const serverTimezoneOffset = (new Date()).getTimezoneOffset()
    const dateTimezoneOffset = rawDate.getTimezoneOffset()
    if (serverTimezoneOffset === dateTimezoneOffset) {
      return moment(rawDate)
    }
    const serverTime = moment()
    const date = moment(rawDate)
  
    const offsetDifference = serverTimezoneOffset - dateTimezoneOffset
    if (offsetDifference > 0) {
      return date.subtract(offsetDifference, 'hours')
    } else {
      return date.add(offsetDifference, 'hours')
    }
  }