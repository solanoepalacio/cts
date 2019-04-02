'use strict'

const moment = require('moment')
const jwt = require('jsonwebtoken')

const User = require('src/server/models/User')

module.exports = async function (ctx, next) {
  const accessToken = ctx.cookies.get('accessToken')
  if (!accessToken) {
    ctx.status = 401
    ctx.body = 'forbidden'
    return
  }
  
  const { expires, userId } = jwt.verify(accessToken, appConfig.token.secret)
  
  const now = moment()

  if (now.isAfter(moment(expires))) {
    ctx.status = 401
    ctx.body = 'forbidden'
    return
  }

  const user = await User.findOne({ _id: userId }, { salt: 0 , password: 0 })
  ctx.state.user = user
  next()
}
