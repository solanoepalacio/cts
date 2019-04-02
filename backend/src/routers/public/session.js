'use strict'

const Router = require('koa-router')

const Session = require('../../models/Session')

const updateSession = require('../../services/session/updateSession')
const getTrackingSession = require('../../services/session/getTrackingSession')

const router = new Router({ prefix: '/session' })

router.post('/save', async function (ctx) {
  const sessionData = ctx.request.body
  const { domainId } = sessionData

  let { session } = await getTrackingSession(ctx, domainId)
  await updateSession(sessionData, session)
  ctx.status = 200
  ctx.body = {}
})

router.post('/end', async function (ctx) {
  const { domainId } = ctx.query

  const query = normalizeQuery(ctx.query)
  try {
    let { session } = await getTrackingSession(ctx, domainId)

    session = await Session.findOneAndUpdate(
      { _id: session._id },
      { $inc: { tabCount: -1 } },
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

function normalizeQuery (query) {
  for (const key of Object.keys(query)) {
    let object
    try {
      object = JSON.parse(query[key])
    } catch (e) {
      // swallow error.
    } finally {
      query[key] = object || query[key]
    }
  }
  return query
}

module.exports = router
