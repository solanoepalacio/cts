'use strict'

const updateActions = require('./updateActions')
const normalizeClientDate = require('./utils/normalizeClientDate')

module.exports = async function updateSession (sessionData, session, finishAt) {
  if (session.views.length === 1) {
    // it's the session referrer (each view has one as well)
    session.referrer = session.views[0].referrer
  }

  await updateActions(sessionData, session) // impure: modifies @param: session

  session.windowWidth = sessionData.windowWidth
  session.windowHeight = sessionData.windowHeight

  session.platform = sessionData.platform
  session.language = sessionData.language
  session.bounced = sessionData.bounced

  if (finishAt && session.tabCount < 1) {
    session.finishedAt = normalizeClientDate(new Date(finishAt))
  }
  return session.save()
}