'use strict'

const fs = require('fs')
const path = require('path')

const jwt = require('jsonwebtoken')
const Router = require('koa-router')

const Session = require('../../models/Session')

const getConfigEvents = require('../../services/config/getEvents')
const getTrackingSession = require('../../services/session/getTrackingSession')

const router = new Router({ prefix: '/loader' })

router.get('/:domainId([0-9a-fA-F]{24})', async function (ctx) {
  const { domainId } = ctx.params

  /**
   * Get and set tracking session
   */
  const { session, deviceId } = await getTrackingSession(ctx, domainId)

  await Session.update({ _id: session._id }, { $inc: { tabCount: 1 } })

  /**
   * get user config events
   */
  const domainEvents = await getConfigEvents(domainId)

  /**
   * generate script
   */
  const scriptTemplatePath = path.resolve(__dirname, '../../static/scriptTemplates/tracking')
  const template = fs.readFileSync(scriptTemplatePath, 'utf-8')

  let script = template
    .replace('{{{domainId}}}', `${domainId}`)
    .replace('{{{host}}}', `${appConfig.host}`)
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

  const newSessionToken = jwt.sign({ sessionId: session._id }, secret)
  ctx.cookies.set({ domainId }, newSessionToken)

  const newDeviceToken = jwt.sign({ deviceId }, secret)
  ctx.cookies.set(newDeviceToken, appConfig.appToken)

  /**
   * respond
   */
  ctx.set({ 'Content-Type': 'application/json' })
  ctx.body = script
})

router.get('/events', async function (ctx) {
  const scriptTemplatePath = path.resolve(__dirname, '../../static/scriptTemplates/events')
  const template = fs.readFileSync(scriptTemplatePath, 'utf-8')

  ctx.set({ 'Content-Type': 'application/json' })
  ctx.body = template
})

module.exports = router
