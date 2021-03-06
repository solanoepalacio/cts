'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import authActions from '../../store/actions/auth'
const { actionCreators } = authActions

class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      register: false
    }
    
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleRegister = this.handleToggleRegister.bind(this)
  }

  handleToggleRegister (e) {
    const register = !this.state.register
    this.setState({ register }, () => {
      register && this.refs.radioButton.setAttribute('checked', register)
      !register && this.refs.radioButton.removeAttribute('checked')
    })
    return false
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  login () {
    if (this.state.register) {
      this.props.registerRequest({
        username: this.state.username,
        password: this.state.password
      })
    } else {
      this.props.authRequest({
        username: this.state.username,
        password: this.state.password
      })
    }
  }

  render () {
    const { auth } = this.props
    const buttonAction = this.state.register ? 'Register' : 'Login'
    const buttonText = auth && auth.fetching ? 'Loading...' : buttonAction
    return (
      <div id="login-component" className="card">
        <h3>
          <label>Let's get started:</label>
        </h3>
        <div className="input-group">
          <span>icon</span>
          <input 
            type="text"
            name="username"
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
        {
          this.props.auth && this.props.auth.errorMessage &&
          <div className="sign-in-error">
            { this.props.auth.errorMessage }
          </div>
        }
        <div id="register" onClick={ this.handleToggleRegister }>
          <span>Create an account, please</span>
          <input type="checkbox" ref="radioButton"/>
        </div>
        <div id="controllers">
          <span className="btn" onClick={ this.login }>
            { buttonText }
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
