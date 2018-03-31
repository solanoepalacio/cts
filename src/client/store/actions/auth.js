'use strict'

import createAsyncActions from "./utils/createAsyncActions";

const { actions, actionCreators } = createAsyncActions(
  [
    {
      name: 'auth',
      endpoint: 'http://localhost:5000/auth/login'
    },
    {
      name: 'logout',
      endpoint: 'http://localhost:5000/auth/logout'
    }
  ]
)

export default { actions, actionCreators }
