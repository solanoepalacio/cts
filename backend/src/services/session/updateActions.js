'use strict'

module.exports = async function updateActions (sessionData, session) {
  await Promise.all([
    updateCollection('views', sessionData, session),
    updateCollection('events', sessionData, session),
    updateCollection('clicks', sessionData, session)
  ])
}

const actions = {
  views: require('../../models/View'),
  events: require('../../models/Event'),
  clicks: require('../../models/Click')
}

async function updateCollection (collectionName, newSession, existingSession) {
  const collection = newSession[collectionName]

  if (!collection || !collection.length) {
    // no actions to be appended.
    return existingSession
  }

  for (const entity of collection) {
    const actionExists = !!existingSession[collectionName].find(
      (e) => e.timestamp === entity.timestamp
    )

    if (actionExists) {
      continue
    }

    entity.session = existingSession._id

    const newAction = await (new actions[collectionName](entity)).save()
    existingSession[collectionName].push(newAction._id)
  }
  return existingSession
}
