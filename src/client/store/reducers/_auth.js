'use strict'

import authActions from '../actions/auth'

const { actions } = authActions

export default function getAuthReducer (initialState) {
  return function authReducer (authState = initialState, { type, payload}) {
    switch (type) {
      case actions.authSuccess:
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          fetching: false,
          userId: payload.userId,
          errorMessage: null
        })
      
      case actions.authFailure:
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          fetching: false,
          userId: undefined,
          errorMessage: payload.message
        })

      case actions.authAttempt:
        return Object.assign({}, authState, {
          valid: false,
          failed: false,
          fetching: true,
          userId: undefined,
          errorMessage: null
        })

      case actions.logoutAttempt:
        return Object.assign({}, authState, {
          fetching: true          
        })
      
      case actions.logoutSuccess:
        return Object.assign({}, authState, {
          valid: false,
          fetching: false,
          failed: false,
          userId: undefined
        })

      case actions.logoutFailure:
        return Object.assign({}, authState)

      default:
        return authState
    }
  }
}