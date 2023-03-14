const passport = require('passport')

class AuthController {
  authUser = async (req, res, next) => {
    try {
      const location = async (role) => {
        return await this.admin_location(res, role)
      }
      passport.authenticate('local', function (err, user, info) {
        if (err) return next(err)

        if (!user) {
          req.flash('error_msg', info.message)
          return res.redirect('/')
        }
        req.logIn(user, async function (err) {
          if (err) {
            return next(err)
          } else {
            // console.log(user)
            // res.redirect('/root')

            await location(user.role)
          }
        })
      })(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  admin_location = async (res, role) => {
    switch (role) {
      case 1:
        res.redirect('/root')
        break

      case 2:
        res.redirect('/editor')
        break

      default:
        // throw new Error("Route wasn't determined!")
        return await this.logout()
    }
  }

  // check if user is loggedin
  isActive = async (req, res, next) => {
    if (req.user && req.user.status == 1) {
      return next()
    } else {
      req.flash('error_msg', 'Forbidden Access.')
      res.redirect('/')
    }
  }

  // rootAccess = async(req, res, next) => {
  //   const loggedInUser = await this.isLoggedIn()
  //   if(loggedInUser)
  // }

  isLoggedIn = async (req, res, next) => {
    if (req.user) {
      return next()
    } else {
      req.flash('error_msg', 'You must be logged in to perform that acction')
      res.redirect('/')
    }
  }

  notLoggedIn = async (req, res, next) => {
    if (!req.user) {
      return next()
    } else {
      res.redirect('/')
    }
  }

  logout = async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  }
}
module.exports = new AuthController()
