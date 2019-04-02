'use strict'

import createAsyncActions from "./utils/createAsyncActions"

const { actions, actionCreators } = createAsyncActions(
  [
    {
      name: 'clientScript',
      endpoint: 'http://localhost:5000/api/loader'
    }
  ]
)

export default { actions, actionCreators }