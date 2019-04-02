'use strict'

const session = require('koa-session')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('src/server/models/User')

const localStrategy = new LocalStrategy({}, async (username, password, done) => {
  try {  
    const user = await User.findOne({ username },
      {
        domains: 1,
        password: 1,
        salt: 1
      }
    )
      .exec()

    if (!user) {
      return done(null, false)
    }

    const encryptedPassword = user.encryptPassword(password, user.salt)
    if (encryptedPassword === user.password) {
      return done(null, user)
    }
  } catch (error) {
    console.error('Error in passport', error)
    return done(error, null)
  }
})

module.exports = async function initPassport (app) {
  app.keys = ['supersecretkeys']
  
  app.use(session(app))

  passport.use(localStrategy)

  app.use(passport.initialize())
}
