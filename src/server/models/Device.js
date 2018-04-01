'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    createdAt: Date
  },
  {
    updatedAt: Date
  },
  {
    collection: 'devices',
    timestamps: true
  }
)

module.exports = mongoose.model('devices', userSchema)
