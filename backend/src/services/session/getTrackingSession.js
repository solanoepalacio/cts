'use strict'

const jwt = require('jsonwebtoken')

const Session = require('../../models/Session')
const Device = require('../../models/Device')

const getLastSession = require('./getLastSession')
const normalizeClientDate = require('./utils/normalizeClientDate')

module.exports = async function getTrackingSession (ctx, domainId) {
  const appToken = ctx.cookies.get(appConfig.appToken)

  let deviceId
  if (appToken) {
    const tokenData = jwt.verify(appToken, appConfig.token.secret)
    deviceId = tokenData.deviceId
  } else {
    const device = await (new Device()).save()
    deviceId = device._id
  }

  const sessionToken = ctx.cookies.get(domainId)

  const clientDate = ctx.req.body && ctx.req.body.clientDate
  const sessionTime = normalizeClientDate(clientDate)

  if (sessionToken) {
    const lastSession = await getLastSession(sessionToken, sessionTime)

    if (!lastSession.finishedAt) {
      // last session hasn't finished yet
      return { session: lastSession, deviceId }
    }
  }

  const session = new Session({
    startedAt: sessionTime,
    device: deviceId,
    domain: domainId
  })
  await session.save()

  return { session, deviceId }
}
