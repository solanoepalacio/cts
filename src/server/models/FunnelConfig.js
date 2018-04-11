'use strict'

const mongoose = require('mongoose')

const funnelConfigSchema = new mongoose.Schema(
  {
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'domains'
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['structured', 'unstructured'] // tunnel like funnels | wonder arround funnels (mercadolibre)
    },
    persistent: { // persists through sessions closing
      type: Boolean,
      default: false
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events'
      }
    ]
  },
  {
    collection: 'funnel_configs',
    timestamps: true
  }
)

funnelConfigSchema.pre('save', function (next) {
  next()
})

module.exports = mongoose.model('funnel_configs', funnelConfigSchema)
