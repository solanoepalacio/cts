'use strict'

const fs = require('fs')
const path = require('path')

module.exports = async function initGlobals () {
  const configPath = path.resolve(__dirname, '../../../config.json')
  global.appConfig =  JSON.parse(fs.readFileSync(configPath, 'utf-8'))

}

