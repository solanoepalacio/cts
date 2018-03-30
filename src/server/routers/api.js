'use strict'

const router = require('koa-router')()

const accessMiddleware = require('src/server/services/auth/accessMiddleware')

router.use(accessMiddleware)

router.get('/', async function (ctx) {
  const user = ctx.state.user // user is here xD
  console.log('user')
  ctx.body = user
})

module.exports = router
