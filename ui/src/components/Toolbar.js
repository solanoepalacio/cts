'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Logout from './auth/Logout'

class Toolbar extends React.Component {
  constructor(props) {
    super (props)
  }

  render () {
    const { auth } = this.props
    const activeClassName = auth.valid ? 'active' : ''
    return (
      <div id="toolbar" className={activeClassName}>
        <div id="header">CTS</div>
        <div>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/config">config</Link>
          </div>
          <div>
            <Link to="/dashboard">dashboard</Link>
          </div>
        </div>
        <Logout />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)(Toolbar)
