'use strict'

const fs = require('fs')
const path = require('path')

const router = require('koa-router')()

router.get('/', async function (ctx) {
  const appTemplatePath = path.resolve(__dirname, '../static/index.html')
  ctx.type = 'html'
  ctx.body = fs.readFileSync(appTemplatePath, 'utf-8')
})

module.exports = {
  router,
  prefix: '/'
}
