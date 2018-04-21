'use strict'

const fs = require('fs')
const path = require('path')

const mainRouter = require('koa-router')()

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName.startsWith('_')) {
    const routerConfig = require(path.join(__dirname, fileName))

    const { router, prefix } = routerConfig

    if (!router || !prefix) {
      throw new Error('router or path prefix not found')
    }

    mainRouter.use(prefix, router.routes())
  }
})

module.exports = mainRouter
