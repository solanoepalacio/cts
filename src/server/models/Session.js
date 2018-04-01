'use strict'

const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
  {
    scriptId: {
      type: String,
      required: true
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    deviceId: {
      type: mongoose.Types.ObjectId,
      ref: 'devices',
      required: true
    },
    views: [{
      type: mongoose.Types.ObjectId,
      ref: 'views'
    }],
    events: [{
      type: mongoose.Types.ObjectId,
      ref: 'events'
    }],
    clicks: [{
      type: mongoose.Types.ObjectId,
      ref: 'clicks'
    }],
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'users',
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  // TODO:
  // merge save data.
  // order events/clicks/views
  
  // loop clicks/events/views creating them & mapping them to ids
  next()
})

module.exports = mongoose.model('users', userSchema)