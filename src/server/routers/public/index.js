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
// router.use(async function (ctx, next) {
//   // ctx.set('cach')
//   ctx.set('Cache-Control', 'no-cache')
//   next()
//   // this.set('Connection', 'keep-alive');
// })
const sessionRouter = require('./session')
router.use(sessionRouter.routes())

const loaderRouter = require('./loader')
router.use(loaderRouter.routes())

module.exports = router
