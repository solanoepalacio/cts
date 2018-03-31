'use strict'

const fs = require('fs')
const path = require('path')

const router = require('koa-router')()

const accessMiddleware = require('src/server/services/auth/accessMiddleware')

router.use(accessMiddleware)

router.get('/', async function (ctx) {
  const user = ctx.state.user
  ctx.body = user
})

router.get('/loader', async function (ctx) {
  console.log('ctx.status', ctx.state)
  const scriptLoaderTemplatePath = path.resolve(__dirname, '../static/scriptLoaderTemplate')

  const scriptTemplate = fs.readFileSync(scriptLoaderTemplatePath, 'utf-8')
  const { scriptId } = ctx.state.user
  const clientScript = scriptTemplate
    .replace('{{scriptId}}', scriptId)
    .replace('{{host}}', appConfig.host)
  
  ctx.type = 'text/plain'
  ctx.status = 200
  ctx.body = clientScript
})

module.exports = router
