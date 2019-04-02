'use strict'

import fetch from 'cross-fetch'

export default function createAsyncAction (name, endpoint) {
  const actions = {
    [ name + 'Attempt' ]: `${name}-attempt`,
    [ name + 'Success' ]: `${name}-success`,
    [ name + 'Failure' ]: `${name}-failure`
  }

  const storeActions = {
    [ name + 'Attempt' ]: pseudoDispatch(name, 'attempt', actions),
    [ name + 'Success' ]: pseudoDispatch(name, 'success', actions),
    [ name + 'Failure' ]: pseudoDispatch(name, 'failure', actions)
  }

  const asyncAction = function (requestBody) {
    return function (dispatch) {
      dispatch(storeActions[name + 'Attempt'])

      const options = {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      }

      if (requestBody) {
        options.method = 'POST'
        
        const headers = {}
        headers['Content-Type'] = typeof requestBody === 'string'
          ? 'text/plain'
          : 'application/json'
        
        Object.assign(options, { headers })

        options.body = JSON.stringify(requestBody)
      }

      return fetch(endpoint, options).then((response) => {
        if (response.status >= 500) {
          console.error('REQUEST - SERVER ERROR:', response.error || response)
          return promise.resolve(false) // swallow errors
        } else if (response.status >= 400) {
          return new Promise((resolve, reject) => 
            response.text().then((s) => reject(s))
          )
        }

        const contentType = response.headers.get('Content-Type')
        return contentType.toLowerCase().indexOf('application/json') !== -1 
          ? response.json()
          : response.text()
      })
      .then((payload) => {
        if (!payload) return // error swallowed
        dispatch(storeActions[ name + 'Success' ](payload))
      })
      .catch((denialText) => {
        dispatch(storeActions[ name + 'Failure' ]({ message: denialText }))
      })
    }
  }

  storeActions[ name + 'Request' ] = asyncAction
  return { actions, actionCreators: storeActions }
}

function pseudoDispatch (name, cicleState, actions) {
  cicleState = cicleState.charAt(0).toUpperCase().concat(cicleState.slice(1))
  return function (payload) {
    return {
      type: actions[name + cicleState],
      payload
    }
  }
}
