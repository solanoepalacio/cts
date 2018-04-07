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
      path: 'config.eventTypes',
      model: 'event_types'
    })
    .lean()
    .exec()
  return config.eventTypes
}
