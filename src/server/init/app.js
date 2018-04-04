'use strict'

const path = require('path')

const Koa = require('koa')
const cors = require('koa-cors')
const mount = require('koa-mount')
const serve = require('koa-static')
const Logger = require('koa-logger')
const noCache = require('koa-no-cache')
const bodyParser = require('koa-bodyparser')

module.exports = function initApp () {
  const app = new Koa()

  app.use(Logger())

  app.use(cors({ credentials: true }))

  app.use(
    noCache({ paths: ['/public/session', '/public/loader'] })
  )

  app.use(bodyParser())

  app.use(serveDirectoryStatically('../static'))

  const router = require('../routers')
  app.use(router.routes())

  const port = appConfig.port || 5000

  app.listen(5000)
  console.log('\n')
  console.log('App is listening on port', port)
  console.log('==============================')

  return app
}

function serveDirectoryStatically (directory) {
  return mount('/static', serve(path.join(__dirname, directory)))
}
