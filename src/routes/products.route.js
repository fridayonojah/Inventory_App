const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer.middleware')
const productController = require('../controllers/product.controller')
const asyncMiddleware = require('../middleware/asyncHandler.middleware')
const { isLoggedIn, isActive } = require('../controllers/auth.controller')

// get all products
router
  .route('/all')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(productController.getAllProducts))

// get create product page
router
  .route('/add')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(productController.addProduct))

// get product by id
router
  .route('/:id')
  .all(isLoggedIn, isActive)
  .get(asyncMiddleware(productController.getProductById))

// post product
router.post('/create', upload, asyncMiddleware(productController.createProduct))

// edit product
router.post(
  '/edit/:id',
  upload,
  asyncMiddleware(productController.updateProduct),
)

// delete product by id
router
  .route('/delete/:id')
  .all(isLoggedIn, isActive)
  .post(asyncMiddleware(productController.deleteProduct))

module.exports = router
