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
  console.log('authSuccess', userId)
  return {
    type: actions.authSuccess,
    payload: { userId }
  }
}

export function authFailure ({ message }) {
  console.log('auth failure', message)
  return {
    type: actions.authFailure,
    payload: { message }
  }
}

export function authRequest (authData) {
  return function (dispatch) {
    dispatch(authAttempt)
    const slug = authData.register ? 'register' : 'login'
    const endpoint = `http://localhost:5000/auth/${slug}`
    console.log('endpoint', endpoint)
    authData.register = undefined
    console.log('endpoint', endpoint)
    return fetch(endpoint, {
      method: 'POST',
      header: {
        credentials: true,
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
