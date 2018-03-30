'use strict'

const Koa = require('koa')
const Logger = require('koa-logger')
const KoaRouter = require('koa-router')

const app = new Koa()

app.use(Logger())

const router = require('./routers')
app.use(router.routes())

const port = 5000
app.listen(5000)
console.log('App is listening on port', 5000)
console.log('==============================')
