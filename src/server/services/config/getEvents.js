'use strict'

const Domain = require('../../models/Domain')

module.exports = async function getDomainEvents (domainId) {
  const { config } = await Domain.findOne(
    {
      _id: domainId
    },
    {
      config: 1
    }
  )
    .populate({
      path: 'config.event_types',
      model: 'event_types'
    })
    .lean()
    .exec()
  return config.event_types
}
