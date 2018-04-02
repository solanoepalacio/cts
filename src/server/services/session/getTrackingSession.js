'use strict'

const moment = require('moment')
const jwt = require('jsonwebtoken')

const Session = require('../../models/Session')
const Device = require('../../models/Device')

const normalizeClientDate = require('./utils/normalizeClientDate')

module.exports = async function getTrackingSession (ctx, scriptId) {
  // TODO : ...global tracking
  const appToken = ctx.cookies.get(appConfig.appToken)
  if (!appToken) {
    // create device entity

    // set cookie
  } else {
    // the user has visited a site with cts installed

  }
  const sessionToken = ctx.cookies.get(scriptId)

  const clientDate = ctx.req.body && ctx.req.body.clientDate
  const sessionTime = normalizeClientDate(clientDate)

  let session
  if (sessionToken) {
    // user has visited the same website before
    const { sessionId, deviceId } = jwt.verify(sessionToken, appConfig.token.secret)
    session = await Session.findOne({ _id: sessionId })
      .populate('views clicks')
      .exec()
    
    if (!session) {
      throw new Error('sessionNotFound')
    }

    if (session.finishedAt !== null) {
      // check if it's a static site reloading the script by loading a new
      // page in the same session
      const finishedAt = moment(session.finishedAt)
      const difference = moment.duration(
        sessionTime.diff(finishedAt)
      )
        .asSeconds()

      if (difference < appConfig.behavior.reloadThreshold) {
        // use last session
        console.log('for threshhold')
        session.finishedAt = null
      }
    } 
    if (!session.finishedAt) {
      return session.save()
    }

    // it's a new session
    const sessionData = {
      scriptId,
      startedAt: sessionTime,
    }

    session = new Session({
      startedAt:  sessionTime,
      deviceId,
      scriptId,
    })

    return session.save()
  } else {
    // it's the first time the user visits the site
    const device = await (new Device()).save()
    session = new Session({
      scriptId,
      startedAt: sessionTime,
      device: device._id.toString()
    })
    return session.save()
  }
}
