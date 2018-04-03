'use strict'

const fs = require('fs')
const path = require('path')

const jwt = require('jsonwebtoken')
const router = require('koa-router')()

const Session = require('../models/Session')

const getConfigEvents = require('../services/config/getEvents')
const updateSession = require('../services/session/updateSession')
const getTrackingSession = require('../services/session/getTrackingSession')

router.get('/loader/:domainId', async function (ctx) {
  const { domainId } = ctx.params

  // get and set tracking session
  const session = await getTrackingSession(ctx, domainId)

  await Session.update({ _id: session._id }, { $inc: { tabCount: 1 }})

  /**
   * get user config events
   */
  const domainEvents = await getConfigEvents(domainId)


  /**
   * generate script
   */
  const scriptTemplatePath = path.resolve(__dirname, '../static/trackingTemplate')
  const template = fs.readFileSync(scriptTemplatePath, 'utf-8')

  let script = template
    .replace('{{{domainId}}}', `${domainId}`)
    .replace('{{{host}}}', `${appConfig.host}`)
    .replace('{{{sessionId}}}', `${session._id}`)
    .replace('{{{environment}}}', `${process.env.NODE_ENV}`)
    // .replace('{{{bounceTimeout}}}', ) TODO: get from client config
    // .replace('{{{configEvents}}}', ) TODO: get from client config


  if (domainEvents) {
    script = script.replace('{{{configEvents}}}', JSON.stringify(domainEvents))
  }


  /**
   * cookie
   */
  const { secret } = appConfig.token

  const newSessionToken = jwt.sign(session._id, appConfig.token.secret)
  ctx.cookies.set(domainId, newSessionToken)
  
  const newDeviceToken = jwt.sign(session.device, appConfig.token.secret)
  ctx.cookies.set(newDeviceToken, appConfig.appToken)

  /**
   * respond
   */
  ctx.set({ 'Content-Type': 'application/json' })
  ctx.body = script
})

router.post('/session/save', async function (ctx) {
  const sessionData = ctx.request.body
  const { domainId } = sessionData

  let session = await getTrackingSession(ctx, domainId)
  await updateSession(sessionData, session)
  ctx.status = 200
  ctx.body = {}

})

router.post('/session/end', async function (ctx) {
  const { domainId } = ctx.query

  const query = normalizeQuery(ctx.query)
  try {
    let session = await getTrackingSession(ctx, domainId)

    session = await Session.findOneAndUpdate(
      { _id: session._id },
      { $inc: { tabCount: -1 }},
      { returnNewDocument: true }
    )

    await updateSession(query, session, query.clientDate)
    
  } catch (e) {
    console.log('WARNING => error updating session end:', e)
    ctx.status = 500
    ctx.body = 'failure'
    return
  }

  ctx.status = 200
  ctx.body = 'ok'
})

router.get('/cleanCookie/:domainId', async function (ctx) {
  const { domainId } = ctx.params
  if (!domainId) {
    ctx.status = 409
    ctx.body = 'ok'
    return
  }
  ctx.cookies.set(domainId, '', { maxAge: Date.now() })
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