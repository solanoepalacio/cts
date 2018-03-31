'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Route } from 'react-router-dom'

import Login from './Login'

class Screen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const loginScreen = (
      <div>
        <div id="more-info" className="card">
          more info
        </div>
        <Login />
      </div>
    )

    const app = (
      <div className="card">
        <Route path="/" exact={true} render={() => (<p>home</p>)} />
        <Route path="/config" render={() => (<p>config</p>)}/>
        <Route path="/dashboard" render={() => (<p>dashboard</p>)}/>
      </div>
    )
    const { auth } = this.props
    const screen = auth.valid ? app : loginScreen
    const activeClassName = auth.valid ? 'active' : ''

    return (
      <div id="screen" className={activeClassName}>{ screen }</div>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default withRouter(connect(mapStateToProps)(Screen))
