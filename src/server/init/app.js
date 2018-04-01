'use strict'

const path = require('path')

const Koa = require('koa')
const mount = require('koa-mount')
const cors = require('koa-cors')
const serve = require('koa-static')
const Logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

module.exports = function initApp () {
  const app = new Koa()

  app.use(Logger())

  app.use(cors())

  app.use(bodyParser())

  app.use(serveDirectoryStatically('../static'))

  const router = require('../routers')
  app.use(router.routes())

  const port = appConfig.port || 5000
  
  app.listen(5000)
  console.log('App is listening on port', port)
  console.log('==============================')

  return app
}

function serveDirectoryStatically (directory) {
  return mount('/static', serve(path.join(__dirname, directory)))
}
