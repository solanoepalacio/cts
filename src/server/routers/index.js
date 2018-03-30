'use strict'

const fs = require('fs')
const path = require('path')

const router = require('koa-router')()

const staticRouter = require('./static')
router.use('/', staticRouter.routes())

const authRouter = require('./auth')
router.use('/auth', authRouter.routes())

const apiRouter = require('./api')
router.use('/api', apiRouter.routes())

module.exports = router