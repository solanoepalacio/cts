'use strict'

import actions from '../actions/auth'

export default function getAuthReducer (initialState) {
  return function authReducer (authState = initialState, { type, payload}) {
    switch (type) {
      case actions.authSuccess:
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          userId: payload.userId
        })
      
      case actions.authFailure:
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          userId: undefined
        })

      case actions.authAttempt:
        return Object.assign({}, authState, {
          valid: false,
          failed: false,
          userId: undefined
        })
      
      default:
        return authState
    }
  }
}