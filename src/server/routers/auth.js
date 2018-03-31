'use strict'

const passport = require('koa-passport')

const router = require('koa-router')()

const User = require('src/server/models/User')
const createUserSession = require('src/server/services/auth/createUserSession')
const accessMiddleware = require('src/server/services/auth/accessMiddleware')

router.post('/register', async function (ctx) {
  // body: {
  //   username: String
  //   password: String
  //   email: String
  // }

  const { username } = ctx.request.body
  const userExists = await User.count({ username }).lean().exec()
  if (userExists) {
    ctx.status = 409
    ctx.type = 'text/plain'
    ctx.body = 'The user already exists. Please try a different one.'
    return
  }

  const user = await new User(ctx.request.body).save()
  createUserSession(ctx, user._id.toString())
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = { userId: user._id }
})

router.post('/login', async function (ctx) {
  await passport.authenticate('local', async (error, user) => {
    if (user) {
      createUserSession(ctx, user._id.toString())
      ctx.status = 200
      ctx.body = { userId: user._id }
      return
    } else if (error) {
      console.error('Error authenticathing user: ', error.message || error)
    } 
    ctx.status = 401
    ctx.type = 'text/plain'
    ctx.body = 'The user/password combination is incorrect. Try again.'
  })(ctx)
})

router.get('/logout', async function (ctx) {
  ctx.cookies.set('accessToken', '', { maxAge: Date.now() })
  ctx.status = 200
  ctx.body = 'success'
})

router.get('/status', accessMiddleware, async function () {
  ctx.status = 200
  ctx.type = 'text/plain'
  ctx.body = 'authenticated'
})

module.exports = router
