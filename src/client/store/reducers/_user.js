'use strict'

import authActions from '../actions/auth'

export default function getUserReducer (initialState) {
  return function userReducer (userState = initialState, { type, payload}) {
    switch (type) {
      case authActions.actions.authSuccess:
        return Object.assign({}, userState, payload.user)
      
      case authActions.actions.logoutSuccess:
        return {}

      default:
        return userState
    }
  }
}