'use strict'

const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sessions'
    },
    url: {
      type: String,
      required: true
    },
    referrer: {
      type: String
    },
    timestamp: Number,
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'views',
    timestamps: true
  }
)

viewSchema.pre('save', function (next) {
  if (typeof this.timestamp !== 'number') {
    const timestamp = Number(this.timestamp)
    if (timestamp.toString() === 'NaN') {
      this.timestamp = null
      console.log('WARNING => view was saved without a timestamp. Duplicates might exist')
      next()
    }
    this.timestamp = timestamp
  }
  next()
})

module.exports = mongoose.model('views', viewSchema)
