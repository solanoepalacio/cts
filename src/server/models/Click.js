'use strict'

const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema(
  { 
    session:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sessions'
    },
    url: {
      type: String,
      required: true
    },
    position: {
      type: String
    },
    elementData: {
      type: Object
    },
    timestamp: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: 'clicks',
    timestamps: true
  }
)

clickSchema.pre('save', function (next) {
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

module.exports = mongoose.model('clicks', clickSchema)
