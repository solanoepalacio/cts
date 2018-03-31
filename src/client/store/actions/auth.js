'use strict'

import fetch from 'cross-fetch'

const actions = {
  authAttempt: 'auth-attempt',
  authSuccess: 'auth-success',
  authFailure: 'auth-failure'
}

export default actions

export function authAttempt () {
  return {
    type: actions.authAttempt,
  }
}

export function authSuccess ({ userId }) {
  return {
    type: actions.authSuccess,
    payload: { userId }
  }
}

export function authFailure ({ message }) {
  return {
    type: actions.authFailure,
    payload: { message }
  }
}

export function authRequest (authData) {
  return function (dispatch) {
    dispatch(authAttempt)
    console.log('authData.register', authData.register)
    const slug = authData.register ? 'register' : 'login'
    const endpoint = `http://localhost:5000/auth/${slug}`
    authData.register = undefined
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: true,
        mode: 'cors'
      },
      body: JSON.stringify(authData)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        dispatch(authFailure({ message: response.statusText }))
        return Promise.resolve(false)
      }
    })
    .then((response) => {
      response && dispatch(authSuccess(response))
    })
    .catch((error) => {
      console.log('WARNING => REQUEST ERROR:', error)
      dispatch(authFailure({ message: error.message }))
    })
  }
}
