'use strict';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import reducersFactory from './reducers'

const history = createHistory()
const loggerMiddleware = createLogger();

const middleware = routerMiddleware(history);

/**
 * This is for redux-devtools-extension in Chrome console.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducersFactory({
    auth: { valid: false, failed: false, userId: null }
  }),
  window.__state__,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware, middleware)
  )
)

export default store