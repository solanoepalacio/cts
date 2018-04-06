'use strict'

const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema(
  {
    eventType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event_types'
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sessions'
    },
    timestamp: Number,
    url: String
  },
  {
    collection: 'events',
    timestamps: true
  }
)

eventTypeSchema.pre('save', function (next) {
  // TODO => fill the label if not available
  next()
})

module.exports = mongoose.model('events', eventTypeSchema)
