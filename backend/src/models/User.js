'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')

const Domain = require('./Domain')

const userSchema = new mongoose.Schema(
  {
    domains: {
      default: [],
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'domains'
        }
      ]
    },
    salt: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'users',
    timestamps: true
  }
)

userSchema.methods.encryptPassword = function (password, salt) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex')
}

userSchema.pre('save', async function (next) {
  if (!this.salt) {
    this.salt = crypto.randomBytes(12).toString('hex')
    this.password = this.encryptPassword(this.password, this.salt)
  }

  if (!this.domains.length) {
    const domain = new Domain({ user: this._id })
    await domain.save()
    console.log('domain', domain)
    this.domains.push(domain._id)
  }
  next()
})

module.exports = mongoose.model('users', userSchema)
