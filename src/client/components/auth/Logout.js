'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import authActions from '../../store/actions/auth'
const { actionCreators } = authActions


function Logout (props) {
  return (
    <div>
      <p onClick={() => props.logoutRequest()}>logout</p>
    </div>
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
