'use strict'

const Koa = require('koa')
const Logger = require('koa-logger')
const KoaRouter = require('koa-router')



async function initServer () {

  const initGlobals = require('./init/globals')
  await initGlobals()
  const initMongo = require('./init/mongo')
  await initMongo()
  
  const app = new Koa()
  
  app.use(Logger())
  
  const router = require('./routers')
  app.use(router.routes())
  
  const port = 5000
  app.listen(5000)
  
  console.log('App is listening on port', port)
  console.log('==============================')
}

initServer()


