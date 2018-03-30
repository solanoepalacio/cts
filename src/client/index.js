'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

import Screen from './components/Screen'
import Toolbar from './components/Toolbar'

const UI = () => (
  <Provider store={store} >
    <div>
      <Screen />
      <Toolbar />
    </div>
  </Provider>
)

ReactDOM.render(<UI/>, document.getElementById('app'))
