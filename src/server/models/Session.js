'use strict'

const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
  {
    domain: {
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
    tabCount: {
      type: Number,
      default: 0
    },
    windowWidth: Number,
    windowHeight: Number,
    referrer: String,
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
  const chronologicalProperties = ['views', 'events', 'clicks']
  for (const prop of chronologicalProperties) {
    this[prop].sort(
      (a, b) => a.timestamp - b.timestamp
    )
  }
  next()
})

module.exports = mongoose.model('sessions', sessionSchema)
