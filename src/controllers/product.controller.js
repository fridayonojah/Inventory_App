const ProductModel = require('../models/product.model')
const dotenv = require('dotenv')
const productModel = require('../models/product.model')
dotenv.config()

// product controller
class ProductController {
  totalProduct = async (req, res, next) => {
    const totalProduct = await productModel.countTotalProduct()
    res.send(totalProduct)
  }

  getAllProducts = async (req, res, next) => {
    let allProduct = await ProductModel.find()
    res.render('all_product', { allProduct, context: 'All products' })
  }

  addProduct = async (req, res, next) => {
    res.render('add_product', { context: 'Add product' })
  }

  getProductById = async (req, res, next) => {
    const product = await ProductModel.findOne({ id: req.params.id })
    res.render('edit_product', { product, context: 'Edit product' })
  }

  createProduct = async (req, res, next) => {
    const productDatas = req.body

    /**
     * This is to check if a product name aldready exiss in DB
     * params(Product name)
     * response product info
     */
    const productExist = await productModel.findOne({
      product_name: productDatas.product_name,
    })
    // console.log(productExist)
    if (productExist) {
      req.flash(
        'error_msg',
        `A product with this name ${productDatas.product_name} already exists.`,
      )
      res.redirect('/product/add')
    } else {
      productDatas.stock_available = req.body.stock_in
      productDatas.image = req.file.filename

      const createProductInfo = await ProductModel.create(productDatas)
      if (createProductInfo)
        req.flash('success_msg', 'Product was added successfuly!')
      res.redirect('/product/all')
    }
  }

  updateProduct = async (req, res, next) => {
    const updateDatas = req.body
    const stock_in = parseInt(updateDatas.stock_in)

    const getProductInfo = await ProductModel.findOne({ id: req.params.id })
    const getStockInDb = parseInt(getProductInfo.stock_in)
    // const stockAvailInDb = parseInt(getProductInfo.stock_available)
    // const stockOutInDb = parseInt(getProductInfo.stock_available)

    if (req.file) {
      updateDatas.image = req.file.filename
    }

    if (getStockInDb === stock_in) {
      const updateProduct = await this.execUpdate(updateDatas, req.params.id)
      if (updateProduct)
        req.flash('success_msg', 'Product updated successfuly!')
      res.redirect('/product/all')
    } else {
      updateDatas.stock_available = stock_in
      updateDatas.stock_out = 0
      const updateProduct = await this.execUpdate(updateDatas, req.params.id)
      if (updateProduct)
        req.flash('success_msg', 'Product updated successfuly!')
      res.redirect('/product/all')
    }
  }

  execUpdate = async (updateDatas, id) => {
    return await ProductModel.update(updateDatas, id)
  }

  // delete a product
  deleteProduct = async (req, res, next) => {
    const result = await ProductModel.delete(req.params.id)

    if (result) req.flash('success_msg', 'Product was deleted successfully')
    res.redirect('/product/all')
  }
}

module.exports = new ProductController()
