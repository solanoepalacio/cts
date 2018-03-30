'use strict'
import { combineReducers } from "redux";

export default function reducerFactory (initialState) {
  const reducers = {}
  const expectedReducersList = Object.keys(initialState)

  for (const reducerName of expectedReducersList) {
    let getReducer
    try {
      getReducer = require(`./_${reducerName}`).default
    } catch (e) {
      console.log('WARNING => reducer not found. ERROR\n:', e)
    }

    reducers[reducerName] = getReducer(initialState[reducerName])
  }
  return combineReducers(reducers)
}