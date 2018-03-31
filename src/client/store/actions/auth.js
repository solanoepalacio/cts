'use strict'

import fetch from 'cross-fetch'

const actions = {
  authAttempt: 'auth-attempt',
  authSuccess: 'auth-success',
  authFailure: 'auth-failure',
  logoutAttempt: 'logout-attempt',
  logoutSuccess: 'logout-success',
  logoutFailure: 'logout-failure'
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

export function logoutAttempt () {
  return {
    type: actions.logoutAttempt
  }
}

export function logoutSuccess () {
  return {
    type: actions.logoutSuccess
  }
}

export function logoutFailure () {
  return {
    type: actions.logoutFailure
  }
}

export function logoutRequest () {
  return function (dispatch) {
    const endpoint = 'http://localhost:5000/auth/logout'
    dispatch(logoutAttempt())
    return fetch(endpoint, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include' 
    })
    .then(
      (response) => response.status === '200' && dispatch(logoutSuccess())
    )
    .catch(
      (error) => dispatch(logoutFailure())
    )
  }
}

export function authRequest (authData) {
  return function (dispatch) {
    dispatch(authAttempt)
    const slug = authData.register ? 'register' : 'login'
    const endpoint = `http://localhost:5000/auth/${slug}`
    authData.register = undefined
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
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
