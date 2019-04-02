'use strict'

import React from 'react'

export default (props) => {
  const script = props.script ? props.script : 'Loading...'
  return (
    <div id="script" className="card">
      <div className="card-title">
        Script:
      </div>
      <div>
        <p>Paste this script in your html code and you are already tracking your customers!</p>
      </div>
      <div id="client-script">
        { script }
      </div>
      <div>
        <span className="btn">
          Copy Code
        </span>
      </div>
    </div>
  )
}