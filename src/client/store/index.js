'use strict';

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import thunkMiddleware from 'redux-thunk'

import reducersFactory from './reducers'

const loggerMiddleware = createLogger()

/**
 * This is for redux-devtools-extension in Chrome console.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
  user: { 
    _id: null,
    domainId: null
  },
  config: {
    fetching: false,
    script: null
  },
  auth: {
    valid: false,
    failed: false,
    userId: null,
    fetching: false
  }
}

const middleWares = applyMiddleware(thunkMiddleware, loggerMiddleware)

export default createStore(reducersFactory(initialState), window.__state__, composeEnhancers(middleWares))

