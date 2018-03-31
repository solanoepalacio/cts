'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'

class Screen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const loginScreen = (
      <div>
        <Login />
        <div id="more-info" className="card">
          more info
        </div>
      </div>
    )

    const app = (
      <div className="card">app</div>
    )

    const screen = this.props.auth.valid ? app : loginScreen
    
    return (<div id="screen">{ screen }</div>)
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)(Screen)
