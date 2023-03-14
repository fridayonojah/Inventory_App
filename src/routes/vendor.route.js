const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer.middleware')
const asyncMiddleWare = require('../middleware/asyncHandler.middleware')
const vendorController = require('../controllers/vendor.controller')
const { isLoggedIn, isActive } = require('../controllers/auth.controller')

// get all vendors
router
  .route('/all')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleWare(vendorController.getAllVendors))

// get and post vendor
router
  .route('/add')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleWare(vendorController.addNewVendor))
  .post(asyncMiddleWare(vendorController.create))

// get vendor by id
router
  .route('/:id')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleWare(vendorController.getVendorById))

// edit vendor
router
  .route('/edit/:id')
  .all(isLoggedIn, isActive)
  .post(asyncMiddleWare(vendorController.updateVendor))

// delete vendor by id
router
  .route('/:id')
  .all(isLoggedIn, isActive)
  .post(asyncMiddleWare(vendorController.deleteVendor))

module.exports = router
