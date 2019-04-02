'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import configActions from '../../store/actions/config'

import Script from './Script'

const { actionCreators } = configActions

class Config extends React.Component {
  componentWillMount () {
    this.props.clientScriptRequest()
  }

  render () {
    const { config } = this.props
    const script = (config && config.script) || null
    return (
      <div id='config-component' >
        <div className='card section-header'>
          Configuration:
        </div>
        <div className='card'>
          Config controllers will go here
        </div>
        <div className='card'>
          <span className='btn'>
            save config
          </span>
          <span className='btn'>
            update script
          </span>
        </div>
        <Script script={script} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ config: state.config })
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Config)
