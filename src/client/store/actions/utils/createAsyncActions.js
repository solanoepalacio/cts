'use strict'

import createAsyncAction from './createAsyncAction'

/**
 * @param {*} actions - An action array
 */
export default function createAsyncActions (actionsData) {
  const actions = {}
  const actionCreators = {}
  for (const asyncAction of actionsData) {
    const { name, endpoint } = asyncAction
    const action = createAsyncAction(name, endpoint)
    Object.assign(actions, action.actions)
    Object.assign(actionCreators, action.actionCreators)
  }
  return { actions, actionCreators }
}
