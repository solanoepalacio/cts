'use strict'

const mongoose = require('mongoose')

const EventType = require('../models/EventType')

const domainSchema = new mongoose.Schema(
  {
    name: String,
    baseUrl: String,
    config: {
      eventTypes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'event_types'
        }
      ],
      funnels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'funnel_configs'
        }
      ]
    },
    createdAt: Date,
    updatedAt: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    collection: 'domains',
    timestamps: true
  }
)

domainSchema.pre('save', function (next) {
  // TODO => fill the label if not available
  next()
})

module.exports = mongoose.model('domains', domainSchema)
