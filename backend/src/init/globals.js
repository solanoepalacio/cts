'use strict'

const fs = require('fs')
const path = require('path')

module.exports = async function initGlobals () {
  global.appConfig =  JSON.parse(fs.readFileSync('config.json', 'utf-8'))

}

