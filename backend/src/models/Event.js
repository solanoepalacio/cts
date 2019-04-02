'use strict'

const mongoose = require('mongoose')

const Funnel = require('./Funnel')
const EventType = require('./EventType')
const FunnelConfig = require('./FunnelConfig')

const eventTypeSchema = new mongoose.Schema(
  {
    eventType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event_types'
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sessions'
    },
    timestamp: Number,
    url: String
  },
  {
    collection: 'events',
    timestamps: true
  }
)

eventTypeSchema.pre('save', async function (next) {
  const eventType = await EventType.findOne({ _id: this.eventType }).lean().exec()

  const funnels = FunnelConfig.find({
    domain: eventType.domain,
    events: eventType._id
  })

  const updates = []

  for (const funnelConfig of funnels) {
    const update = updateFunnel(funnelConfig)
    updates.push(update)
  }
  await Promise.all(updates)
  next()
})

async function updateFunnel (funnelConfig, eventType) {
  const funnelQuery = { // make sure there shouldnt be more than one
    config: funnelConfig._id,
    domain: eventType._id,
    fullfilled: { $elemMatch: { eventType: eventType._id } }
  }

  if (!funnelConfig.persistent) {
    funnelQuery.session = this.session
  }

  const existingFunnel = await Funnel.findOne(funnelQuery,
    {
      _id: 1
    }
  )
    .lean()
    .exec()

  if (existingFunnel) {
    return updateExistingFunnel(existingFunnel, eventType)
  }

  if (funnelConfig.type === 'unstructured') {
    // the funnel was not present in the session, start a new one:
    const funnel = new Funnel({
      session: this.session,
      domain: eventType.domain,
      config: funnelConfig._id,
      fullfilled: [ eventType._id ]
    })

    return funnel.save()
  }

  /**
   * last case: funnelConfig.type = 'structured'
   * check it there is funnels that start with this event or tha
   * have this event as the next one.
   */

  const startingFunnelsQuery = {
    domain: eventType.domain,
    'events.0': eventType._id
  }

  const startedFunnelsQuery = {
    domain: eventType.domain,
    config: funnelConfig._id,
    nextEvent: eventType._id
  }

  if (!eventType.persistent) {
    startedFunnelsQuery.session = this.session
  }

  const [ newFunnels, updateFunnels ] = await Promise.all([
    FunnelConfig.find(startingFunnelsQuery),
    Funnel.find(startedFunnelsQuery)
  ])

  const updates = []

  for (const newFunnelConfig of newFunnels) {
    const nextEvent = getNextEvent(newFunnelConfig, eventType._id)
    const newFunnel = new Funnel({
      session: this.session,
      domain: eventType.domain,
      config: funnelConfig._id,
      fullfilled: [eventType._id],
      nextEvent: nextEvent
    })
    updates.push(newFunnel.save())
  }

  for (const updateFunnel of updateFunnels) {
    const updateQuery = {
      $push: { fullfilled: eventType._id }
    }

    const nextEvent = getNextEvent(updateFunnel.config, eventType._id)
    if (nextEvent) {
      updateQuery.$set.nextEvent = nextEvent
    } else {
      updateQuery.$set.nextEvent = null
      updateQuery.$set.success = true
    }

    const update = Funnel.findOneAndUpdate(
      {
        _id: updateFunnel._id
      },
      updateQuery
    )

    updates.push(update)
  }
  return Promise.all(updates)
}

function updateExistingFunnel (existingFunnel, eventType) {
  /**
     * user has clicked more than once in the same event
     * for an existing funnel.
     * No need to update anything.
     */
  if (!eventType.multi) return Promise.resolve(null)

  const updatedFullfilledEvents = existingFunnel.fullFilledEvents
    .map((f) => {
      if (f.eventType.toString() === eventType._id.toString()) {
        ++f.count
      }
      return f
    })

  return Funnel.findOneAndUpdate(
    {
      _id: existingFunnel._id
    },
    {
      $set: { fullfilled: updatedFullfilledEvents }
    }
  )
}

function getNextEvent ({ events }, eventId) {
  eventId = eventId.toString()
  const eventIds = events.map(e => e.toString())

  const index = eventIds.indexOf(eventId)

  if (index === -1) {
    throw new Error('eventNotFound: in funnel update')
  }

  if (index === events.length - 1) {
    return null
  }

  return events[index + 1]
}

module.exports = mongoose.model('events', eventTypeSchema)
