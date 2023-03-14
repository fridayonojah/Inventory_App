// This file contains passport logic for local login

const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const query = require('../db/db-connection')
const userModel = require('../models/user.model')

const localAuth = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email: email })
          if (!user) return done(null, false, { message: 'Incorrect email' })

          const valid = await bcrypt.compare(password, user.password)
          if (!valid)
            return done(null, false, { message: 'Incorrect password' })

          return done(null, user)
        } catch (error) {
          return done(error)
        }
      },
    ),
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await userModel.findOne({ id })
      if (user) done(null, user)
    } catch (error) {
      return done(error)
    }
  })
}

module.exports = {
  localAuth,
}
