/**
 * Module Dependencies
 */

var timer = require('..')({ slow: '3s', threshold: 2000 })
var Koa = require('koa')
var app = new Koa()

/**
 * Middleware
 */

app.use(timer(async function find_user (ctx, next) {
  await wait(250)
  await next()
  await wait(2000)
}))

app.use(timer(async function find_company (ctx, next) {
  await wait(1000)
  await next()
  await wait(1000)
}))

app.use(timer(async function pull_financials (ctx, next) {
  await wait(500)
  await next()
  await wait(500)
}))

app.use(timer(async function render (ctx) {
  await wait(250)
  ctx.body = 'hola'
  await wait (1000)
}))

/**
 * Listen
 */

app.listen(5000)

/**
 * Wait
 */

function wait (ms) {
  return new Promise(res => setTimeout(res, ms))
}
