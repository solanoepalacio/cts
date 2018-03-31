'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    scriptId: String,
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'users',
    timestamps: true
  }
)

userSchema.methods.encryptPassword = function (password, salt) {
  const encryptedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')
}

userSchema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = crypto.randomBytes(12).toString('hex')
    this.password = this.encryptPassword(this.password, this.salt)
  }
  
  if (!this.scriptId) {
    this.scriptId = crypto.randomBytes(8).toString('hex')
  }
  next()
})



module.exports = mongoose.model('users', userSchema)