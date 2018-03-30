'use strict'

async function initServer () {

  const initGlobals = require('./init/globals')
  await initGlobals()
  const initMongo = require('./init/mongo')
  await initMongo()
  
  const initApp = require('./init/app')
  const app = await initApp()

  const initPassport = require('./init/passport')
  await initPassport(app)
}

initServer()


