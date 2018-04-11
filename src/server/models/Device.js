'use strict'

const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema(
  {
    platform: String,
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'devices',
    timestamps: true
  }
)

module.exports = mongoose.model('devices', deviceSchema)
