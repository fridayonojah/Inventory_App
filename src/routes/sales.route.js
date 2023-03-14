const express = require('express')
const router = express.Router()
const saleController = require('../controllers/sale.controller')
const asyncMiddleware = require('../middleware/asyncHandler.middleware')
const { isLoggedIn, isActive } = require('../controllers/auth.controller')

// show sales reports
router
  .route('/')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(saleController.allSalesReports))

router
  .route('/add')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(saleController.addSalesPage))
  .post(asyncMiddleware(saleController.create))

router
  .route('/edit/:id')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(saleController.getSaleById))
  .post(asyncMiddleware(saleController.updateSales))

router
  .route('/reports')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(saleController.allSalesReports))

router
  .route('/details')
  .all(isLoggedIn, isActive)
  .post(asyncMiddleware(saleController.salesDetails))
router
  .route('/filter')
  .all(isLoggedIn, isActive)
  .post(asyncMiddleware(saleController.filterSalesReport))

module.exports = router
