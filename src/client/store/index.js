'use strict';

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import thunkMiddleware from 'redux-thunk'

import reducersFactory from './reducers'

const loggerMiddleware = createLogger();

/**
 * This is for redux-devtools-extension in Chrome console.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducersFactory({
    auth: { valid: false, failed: false, userId: null, fetching: false }
  }),
  window.__state__,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
)

export default store