'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'

class Screen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id="screen">
        <Login />
        <div id="more-info" className="card">
          more info
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.auth

export default connect(mapStateToProps)(Screen)
