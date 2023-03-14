const express = require('express')
const userRoute = require('../routes/user.route')
const productRouter = require('../routes/products.route')
const vendorRouter = require('../routes/vendor.route')
const salesRouter = require('../routes/sales.route')
const error = require('../middleware/error.middleware')

module.exports = function (app) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(`/`, userRoute)
  app.use(`/product`, productRouter)
  app.use(`/vendor`, vendorRouter)
  app.use(`/sales`, salesRouter)

  app.use(error)

  // not found page 404
  app.all('*', (req, res, next) => {
    res.render('cst_404')
  })
}
