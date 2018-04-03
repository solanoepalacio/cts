'use strict'

const Domain = require('../../models/Domain')

module.exports = async function (domainId)  {
  return await Domain.findOne(
    { 
      _id: domainId
    }
    // {
    //   'config.events': 1,
    //   _id: 0
    // }
  )
    .lean()
    .exec()
}