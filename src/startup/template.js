const path = require('path')
const express = require('express')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const flash = require('connect-flash')
const errorMiddleware = require('../middleware/error.middleware')
const dotenv = require('dotenv')
dotenv.config()

module.exports = function (app) {
  app.use(errorMiddleware)
  app.set('view engine', 'ejs')

  app.use('/static', express.static(path.join(__dirname, '../../public')))
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: process.env.secret,
      resave: true,
      saveUninitialized: true,
    }),
  )

  app.use(flash())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}
