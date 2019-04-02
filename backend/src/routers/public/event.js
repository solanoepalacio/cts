'use strict'

const Router = require('koa-router')

const EventType = require('../../models/EventType')

const router = new Router({ prefix: '/event' })

router.put('/success', async function (ctx) {
  // notifies that an event is working at a certain path
  let { eventTypeId, urlPath } = ctx.request.body

  let { active, inactivePaths, loadedAt } = await EventType.findOne(
    {
      _id: eventTypeId
    },
    {
      inactivePaths: 1,
      active: 1,
      loadedAt: 1
    }
  )
    .lean()
    .exec()

  if (active && !inactivePaths.length) {
    ctx.status = 200
    ctx.body = 'ok'
    return
  }

  urlPath = urlPath
    .replace(/\//g, ' ').trim().split(' ').join('/')

  inactivePaths = inactivePaths.filter((p) => {
    p = p.replace(/\//g, ' ').trim().split(' ').join('/')
    return p !== urlPath
  })

  if (!inactivePaths.length) {
    active = true
  }

  if (!loadedAt) {
    loadedAt = new Date()
  }

  await EventType.update(
    {
      _id: eventTypeId
    },
    {
      $set: { active, inactivePaths, loadedAt }
    }
  )
    .lean()
    .exec()

  ctx.status = 200
  ctx.body = 'ok'
})

router.put('/failure', async function (ctx) {
  let { eventTypeId, urlPath } = ctx.request.body

  const eventType = await EventType.findOne({ _id: eventTypeId }).exec()

  urlPath = urlPath
    .replace(/\//g, ' ').trim().split(' ').join('/')

  const pathIsInactive = !!eventType.inactivePaths.find((p) => {
    p = p.replace(/\//g, ' ').trim().spit(' ').join('/')
    return p === urlPath
  })

  if (pathIsInactive) {
    // path is already inactive for this event
    if (eventType.active) {
      eventType.active = false
      await eventType.save()
    }
    ctx.status = 200
    ctx.body = 'ok'
    return
  }

  eventType.inactivePaths.push(urlPath)
  eventType.active = false
  await eventType.save()
  ctx.body = 200
  ctx.body = 'ok'
})

module.exports = router
