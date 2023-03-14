const express = require('express')
const router = express.Router()
const app = require('../controllers/app.controller')
const userController = require('../controllers/users.controller')
const asyncMiddleware = require('../middleware/asyncHandler.middleware')
const upload = require('../middleware/multer.middleware')
const {
  authUser,
  isLoggedIn,
  isActive,
  notLoggedIn,
  logout,
} = require('../controllers/auth.controller')

// Auth
router
  .route('/')
  // .all(notLoggedIn)
  .get(asyncMiddleware(app.getLogin))
  .post(authUser)

router
  .route('/user/password_reset')
  .get(asyncMiddleware(app.resetPassword))
  .post(asyncMiddleware(userController.resetPassword))

router
  .route('/user/add')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(userController.createUserPage))

router.post(
  '/action/create',
  upload,
  asyncMiddleware(userController.createUser),
)

router.post(
  '/action/update/:id',
  upload,
  asyncMiddleware(userController.updateuser),
)

router
  .route('/root')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(userController.dashboard))

router
  .route('/editor')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(userController.dashboard))

router
  .route('/user/all')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(userController.getAllusers))

router
  .route('/user/:id')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(userController.getUserById))

router.route('/logout').get(logout)

module.exports = router
