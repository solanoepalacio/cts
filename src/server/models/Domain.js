'use strict'

const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
  {
    name: String,
    baseUrl: String,
    config: {
      events: [
        {
          type: Object,
          type: {
            type: String,
            enum: ['click', 'keyDown','scrollBottom', 'spendTime', 'textInput'] // see video? do a certain combination of things?
          },
          label: String,
          unique: Boolean,
          bubbles: Boolean
          // TODO => funnel events
          // funnels: {
          //   type: mongoose.Schema.Types.ObjectId,
          //   ref: 'funnels'
          // }
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
    collection: 'sessions',
    timestamps: true
  }
)

sessionSchema.pre('save', function (next) {
  // TODO => fill the label if not available
  next()
})

module.exports = mongoose.model('sessionSchema', sessionSchema)