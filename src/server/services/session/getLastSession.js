'use strict'

const moment = require('moment')
const jwt = require('jsonwebtoken')

const Session = require('../../models/Session')

module.exports = async function getLastSession (sessionToken, sessionTime) {
  // user has visited the same website before
  const { sessionId, deviceId } = jwt.verify(sessionToken, appConfig.token.secret)
  const session = await Session.findOne({ _id: sessionId })
    .populate('views clicks')
    .exec()
  
  if (!session) {
    throw new Error('sessionNotFound')
  }

  if (session.finishedAt !== null) {
    // check if it's a static site reloading the script by loading a new
    // page in the same session
    const finishedAt = moment(session.finishedAt)
    const difference = moment.duration(sessionTime.diff(finishedAt)).asSeconds()

    if (difference < appConfig.behavior.reloadThreshold) {
      // it is, use last session
      session.finishedAt = null
    }
  }
  return session.save()
}