'use strict'

const mongoose = require('mongoose')

const funnelSchema = new mongoose.Schema(
  {
    funnelConfig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'funnels_configs'
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'domains'
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sessions'
    },
    events: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'events'
        }
      ],
      required: true
    },
    fullfilled: {
      type: [
        {
          eventType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'events'
          },
          count: {
            type: Number,
            default: 0
          }
        }
      ],
      default: []
    },
    nextEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events'
    },
    success: {
      type: Boolean,
      default: false
    },
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'funnels',
    timestamps: true
  }
)

module.exports = mongoose.model('funnels', funnelSchema)
