'use strict'

const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['click', 'keyDown', 'scrollBottom', 'spendTime', 'textInput'] // see video? do a certain combination of things?
    },
    label: String,
    unique: Boolean,
    bubbles: Boolean,
    dataId: String,
    uri: {
      match: String,
      includeChildren: Boolean
    }
    // TODO => funnel events
    // funnels: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'funnels'
    // }
    // note: maybe funnels should point to events instead of the other way arround
  },
  {
    collection: 'event_types',
    timestamps: true
  }
)

eventTypeSchema.pre('save', function (next) {
  // TODO => fill the label if not available
  next()
})

module.exports = mongoose.model('event_types', eventTypeSchema)
