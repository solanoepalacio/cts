'use strict'

export default function getAuthReducer (initialState) {
  return function authReducer (authState = initialState, action) {
    switch (action.type) {
      case 'auth-success':
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          userId: action.userId
        })
      
      case 'auth-failure':
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          userId: undefined
        })

      case 'auth-logout':
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