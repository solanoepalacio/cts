'use strict'

const router = require('koa-router')()
const noCache = require('koa-no-cache')

router.get('/cleanCookie/:domainId', async function (ctx) {
  const { domainId } = ctx.params
  if (!domainId) {
    ctx.status = 409
    ctx.body = 'ok'
    return
  }
  ctx.cookies.set(domainId, '', { maxAge: Date.now() })
  ctx.status = 200
  ctx.body = 'ok'
})

router.use(noCache({
  paths: ['/session/*', '/loader/*']
}))

const sessionRouter = require('./session')
router.use(sessionRouter.routes())

const loaderRouter = require('./loader')
router.use(loaderRouter.routes())

const eventRouter = require('./event')
router.use(eventRouter.routes())

module.exports = router
