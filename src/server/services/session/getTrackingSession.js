'use strict'

const Session = require('../../models/Session')
const Device = require('../../models/Device')

const getLastSession = require('./getLastSession')
const normalizeClientDate = require('./utils/normalizeClientDate')

module.exports = async function getTrackingSession (ctx, scriptId) {

  // TODO : ...global tracking
  const appToken = ctx.cookies.get(appConfig.appToken)
  if (!appToken) {
    // it's the first time the user visits a site with cts installed
    // create device entity
    // set cookie
  } else {
    // the user has visited a site with cts installed
  }
  const sessionToken = ctx.cookies.get(scriptId)

  const clientDate = ctx.req.body && ctx.req.body.clientDate
  const sessionTime = normalizeClientDate(clientDate)

  let deviceId
  if (sessionToken) {
    const lastSession = await getLastSession(sessionToken)

    if (!lastSession.finishedAt) {
      // last session hasn't finished yet
      return lastSession
    }
    // session has finished. Use same device id as last session.
    deviceId = lastSession.device
  }
  
  if (!deviceId) {
    const device = await (new Device()).save()
    deviceId = device._id
  }

  const session = new Session({
    startedAt:  sessionTime,
    device: deviceId,
    scriptId
  })

  return session.save()
}
