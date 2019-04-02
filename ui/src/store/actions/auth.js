'use strict'

import createAsyncActions from './utils/createAsyncActions'

const { actions, actionCreators } = createAsyncActions(
  [
    {
      name: 'auth',
      endpoint: 'http://localhost:5000/auth/login'
    },
    {
      name: 'register',
      endpoint: 'http://localhost:5000/auth/register'
    },
    {
      name: 'logout',
      endpoint: 'http://localhost:5000/auth/logout'
    }
  ]
)

export default { actions, actionCreators }
