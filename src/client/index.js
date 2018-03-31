'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore, ConnectedRouter } from 'react-router-redux'
import { Link, Route } from 'react-router-dom'


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

const history = createBrowserHistory()

const UI = () => (
  <Provider store={ store } >
    <ConnectedRouter history={ history }>
      <div>
        <Toolbar />
        <Screen />

      </div>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<UI/>, document.getElementById('app'))
