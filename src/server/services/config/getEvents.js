'use strict'

const Domain = require('../../models/Domain')

module.exports = async function getDomainEvents (domainId) {
  return Domain.findOne(
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
