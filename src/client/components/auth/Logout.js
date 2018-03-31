'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutRequest } from '../../store/actions/auth'


function Logout (props) {
  console.log('props', props)
  return (
    <div>
      <p onClick={() => props.logoutRequest()}>logout</p>
    </div>
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({ logoutRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
