'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

import Screen from './components/Screen'
import Toolbar from './components/Toolbar'

/**
 * global styles:
 */

 import './styles/base.scss'
 import './styles/screen.scss'
 import './styles/toolbar.scss'
 
 /**
  * component specific styles:
  */
import './styles/login.scss'

const UI = () => (
  <Provider store={store} >
    <div>
      <Toolbar />
      <Screen />
    </div>
  </Provider>
)

ReactDOM.render(<UI/>, document.getElementById('app'))
