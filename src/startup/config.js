const passport = require('passport')
const dotenv = require('dotenv')
const { localAuth } = require('../services/passportLogic')
dotenv.config()

module.exports = function (app) {
  localAuth(passport)

  app.use(passport.initialize())
  app.use(passport.session())
}
