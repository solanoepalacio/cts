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
    finishedAt: {
      type: Date
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'devices',
      required: true
    },
    views: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'views'
    }],
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events'
    }],
    clicks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clicks'
    }],
    windowWidth: Number,
    windowHeight: Number,
    referer: String,
    platform: String,
    language: String,
    bounced: {
      type: Boolean,
      default: true
    },
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'sessions',
    timestamps: true
  }
)

sessionSchema.pre('save', function (next) {
  // TODO:
  // merge save data.
  // order events/clicks/views
  
  // loop clicks/events/views creating them & mapping them to ids
  next()
})

module.exports = mongoose.model('sessionSchema', sessionSchema)