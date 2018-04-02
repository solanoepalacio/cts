'use strict'

const fs = require('fs')
const path = require('path')

const jwt = require('jsonwebtoken')
const router = require('koa-router')()

const Session = require('../models/Session')

const updateSession = require('../services/session/updateSession')
const getTrackingSession = require('../services/session/getTrackingSession')

router.get('/loader/:scriptId', async function (ctx) {
  const { scriptId } = ctx.params

  // get and set tracking session
  const session = await getTrackingSession(ctx, scriptId)

  if (!session.finishedAt) {
    session.tabCount ++
    await Session.update({ _id: session._id }, { $inc: { tabCount: 1 }})
  }

  // when config is created, here we should get the client config
  // using the script id

  // get template
  const scriptTemplatePath = path.resolve(__dirname, '../static/trackingTemplate')
  const template = fs.readFileSync(scriptTemplatePath, 'utf-8')

  const script = template
    .replace('{{{scriptId}}}', `${scriptId}`)
    .replace('{{{host}}}', `${appConfig.host}`)
    .replace('{{{sessionId}}}', `${session._id}`)
    .replace('{{{environment}}}', `${process.env.NODE_ENV}`)
    // .replace('{{{bounceTimeout}}}', ) TODO: get from client config
    // .replace('{{{configEvents}}}', ) TODO: get from client config


  // set script variables
  const cookieData = {
    sessionId: session._id.toString(),
    deviceId: session.device.toString()
  }
  const newToken = jwt.sign(cookieData, appConfig.token.secret)
  ctx.cookies.set(scriptId, newToken)
  ctx.set({ 'Content-Type': 'application/json' })
  ctx.body = script
})

router.post('/session/save', async function (ctx) {
  const sessionData = ctx.request.body
  const { scriptId } = sessionData

  let session = await getTrackingSession(ctx, scriptId)
  await updateSession(sessionData, session)
  ctx.status = 200
  ctx.body = {}

})

router.post('/session/end', async function (ctx) {
  const { scriptId } = ctx.query

  if (!scriptId) {
    console.log('WARNING => scriptId not found')
  }

  const query = normalizeQuery(ctx.query)
  try {
    let session = await getTrackingSession(ctx, scriptId)
    const finishSessionAt = query.clientDate
    await Session.update({ _id: session._id }, { $inc: { tabCount: -1 }})
    session.tabCount--
    await updateSession(query, session, finishSessionAt)
    
  } catch (e) {
    console.log('WARNING => error updating session end:', e)
    ctx.status = 5000
    ctx.body = 'failure'
    return
  }

  ctx.status = 200
  ctx.body = 'ok'
})

router.get('/cleanCookie/:scriptId', async function (ctx) {
  const { scriptId } = ctx.params
  if (!scriptId) {
    ctx.status = 409
    ctx.body = 'ok'
    return
  }
  ctx.cookies.set(scriptId, '', { maxAge: Date.now() })
  ctx.status = 200
  ctx.body = 'ok'
})

function normalizeQuery (query) {
  for (const key of Object.keys(query)) {
    let object
    try {
      object = JSON.parse(query[key])
    } catch (e) {
      // swallow error.
    } finally {
      query[key] =  object || query[key]
    }
  }
  return query
}

module.exports = router