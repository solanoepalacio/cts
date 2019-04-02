'use strict'

const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema(
  {
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'domains'
    },
    type: {
      type: String,
      enum: [
        'click',
        'keyDown',
        'scrollBottom',
        'spendTime',
        'textInput'
      ]
    },
    value: Number,
    label: String,
    unique: Boolean,
    bubbles: Boolean,
    uri: {
      match: String,
      includeChildren: Boolean
    },
    active: {
      type: Boolean,
      default: true
    },
    loadedAt: Date,
    inactivePaths: [
      {
        type: String
      }
    ]
  },
  {
    collection: 'event_types',
    timestamps: true
  }
)

module.exports = mongoose.model('event_types', eventTypeSchema)
