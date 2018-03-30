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

  const { email, username } = ctx.request.body
  const userExists = await User.count({ email, username }).lean().exec()
  if (userExists) {
    ctx.status = 409
    ctx.type = 'text/plain'
    ctx.body = 'user conflict'
    return
  }

  const user = await new User(ctx.request.body).save()
  createUserSession(ctx, user._id.toString)
  ctx.status = 200
  ctx.type = 'application/json'
  // TODO => send cookie to log user in.
  ctx.body = { userId: user._id }
})

router.post('/login', async function (ctx) {
  console.log('login', ctx.request.body)
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
    ctx.body = 'forbidden'
  })(ctx)
})

router.get('/logout', async function (ctx) {
  ctx.cookies.set('accessToken', '', { maxAge: Date.now() })
  ctx.status = 200
  ctx.body = 'success'
})

// router.get('/check', accessMiddleware)

module.exports = router
