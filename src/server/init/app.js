'use strict'

const Koa = require('koa')
const Logger = require('koa-logger')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')

module.exports = function initApp () {
  const app = new Koa()

  app.use(Logger())

  app.use(bodyParser())

  const router = require('../routers')
  app.use(router.routes())

  const port = appConfig.port || 5000
  
  app.listen(5000)
  console.log('App is listening on port', port)
  console.log('==============================')

  return app
}