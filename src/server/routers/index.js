'use strict'

const router = require('koa-router')()

const staticRouter = require('./static')
router.use('/', staticRouter.routes())

const authRouter = require('./auth')
router.use('/auth', authRouter.routes())

const apiRouter = require('./api')
router.use('/api', apiRouter.routes())

const publicRouter = require('./public')
router.use('/public', publicRouter.routes())

module.exports = router
