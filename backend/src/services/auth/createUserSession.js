'use strict'

const moment = require('moment')
const jwt = require('jsonwebtoken')

module.exports = async function createUserSession (ctx, userId) {
  const expires = moment().add({ seconds: appConfig.token.expiration })
  const accessToken = jwt.sign({ userId, expires }, appConfig.token.secret)

  ctx.cookies.set('accessToken', accessToken)
}