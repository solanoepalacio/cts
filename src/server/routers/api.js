'use strict'

const fs = require('fs')
const path = require('path')

const router = require('koa-router')()

const accessMiddleware = require('src/server/services/auth/accessMiddleware')

router.use(accessMiddleware)

router.get('/', async function (ctx) {
  // TODO => development endpoint
  const user = ctx.state.user
  ctx.body = user
})

router.get('/loader', async function (ctx) {
  const clientScriptTemplatePath = path.resolve(__dirname, '../static/clientScriptTemplate')

  const scriptTemplate = fs.readFileSync(clientScriptTemplatePath, 'utf-8')
  const { domains } = ctx.state.user
  const domainId = domains[0]
  const clientScript = scriptTemplate
    .replace('{{domainId}}', domainId)
    .replace('{{host}}', appConfig.host)
  
  ctx.set = { "Content-Type": "text/plain" }
  ctx.status = 200
  ctx.body = clientScript
})

module.exports = router
