'use strict'

const mongoose = require('mongoose')

module.exports = async function initMongo () {
  if (!appConfig.MONGO) {
    throw new Error('notFound: mongo conn string')
  }
  const { MONGO } = appConfig
  await mongoose.connect(MONGO)

  console.log('Mongo is connected to', MONGO)
  console.log('=====================================')
}