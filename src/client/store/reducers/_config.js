'use strict'

import configActions from '../actions/config'

const { actions } = configActions

export default function getConfigReducer (initialState) {
  return function configReducer (configState = initialState, { type, payload }) {
    switch (type) {
      case actions.clientScriptSuccess:
        return Object.assign({}, configState, {
          fetching: false,
          script: payload
        })

      case actions.clientScriptAttempt:
        return Object.assign({}, configState, {
          fetching: true
        })
        
      case actions.clientScriptFailure:
        return Object.assign({}, configState, {
          fetching: false
        })
      
      default:
        return configState
    }
  }
}