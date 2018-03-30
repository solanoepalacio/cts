'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authActions from '../store/actions/auth'

class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  login () {
    this.props.authRequest({
      email: this.state.email,
      password: this.state.password
    })
  }

  render () {
    return (
      <div id="login" className="card">
        <h3>
          <label>Let's get started:</label>
        </h3>
        <div className="input-group">
          <span>icon</span>
          <input 
            type="text"
            name="email"
            placeholder="jhon@doe.com"
            value={ this.state.email }
            onChange={ this.handleChange }
          />
        </div>
        <div className="input-group">
          <span>icon</span>
          <input
            type="password"
            name="password"
            placeholder="*********"
            onChange={ this.handleChange }
            value={ this.state.password }
          />
        </div>
        <div id="register">
          <span>Create an account, please</span>
          <input type="checkbox"/>
        </div>
        <div id="controllers">
          <span
            className="btn"
            onClick={ this.login }
          >
            Login
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.auth
const mapDispatchToProps = (dispatch) => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
