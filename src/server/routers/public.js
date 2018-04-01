'use strict'

const fs = require('fs')
const path = require('path')

const jwt = require('jsonwebtoken')
const router = require('koa-router')()

const getTrackingSession = require('../services/session/createTrackingSession')

router.get('/loader/:scriptId', async function (ctx) {
  console.log('ctx.request.params', ctx.params)
  console.log('in public loader, bro')
  const { scriptId } = ctx.params

  // get and set tracking session
  const session = await getTrackingSession(ctx, scriptId)

  // when config is created, here we should get the client config
  // using the script id

  // get template
  const scriptTemplatePath = path.resolve(__dirname, '../static/trackingTemplate')
  const template = fs.readFileSync(scriptTemplatePath, 'utf-8')

  const script = template
    .replace('{{{scriptId}}}', `'${scriptId}'`)
    .replace('{{{host}}}', `'${appConfig.host}'`)
    .replace('{{{sessionId}}}', `'${session._id}'`)
    .replace('{{{environment}}}', `'${process.env.NODE_ENV}'`)
    // .replace('{{{bounceTimeout}}}', ) TODO: get from client config
    // .replace('{{{configEvents}}}', ) TODO: get from client config


  // set script variables
  const cookieData = {
    sessionId: session._id,
    deviceId: session.device
  }
  const newToken = jwt.sign(cookieData, appConfig.token.secret)
  ctx.set({ 'Content-Type': 'application/json' })
  ctx.body = script
})

module.exports = router