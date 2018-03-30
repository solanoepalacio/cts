'use strict'

import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Toolbar extends React.Component {
  constructor(props) {
    super (props)
  }

  render () {
    return (
      <div id="toolbar">
        <div id="header">CTS</div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state.auth
}

export default connect(mapStateToProps)(Toolbar)
