'use strict'
const fs = require('fs')
const path = require('path')

const KoaRouter = require('koa-router')

const router = KoaRouter()

router.get('/', async function (ctx) {
  const appTemplatePath = path.resolve(__dirname, '../static/index.html')
  ctx.type = 'html'
  ctx.body = fs.readFileSync(appTemplatePath, 'utf-8')
})

router.get('/static/:filetype/:filename', async function (ctx) {
  const { filetype, filename } = ctx.params
  const filepath = path.resolve(__dirname, `../static/${filetype}/${filename}`)
  let file
  try {
    file = fs.readFileSync(filepath, 'utf-8')
  } catch (e) {
    console.log(`file not found: /${filetype}/${filename}`)
  }

  if (file) ctx.body = file
})

module.exports = router