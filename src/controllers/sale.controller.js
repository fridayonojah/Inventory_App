const productModel = require('../models/product.model')
const vendorModel = require('../models/vendor.model')
const saleModel = require('../models/sale.model')

class SalesController {
  allSalesReports = async (req, res) => {
    const data = {
      allReport: await saleModel.find(),
      context: 'All sales report',
    }

    res.render('sales_report', data)
  }

  filterSalesReport = async (req, res) => {
    const filter = req.body
    const allReport = await saleModel.filter(filter)
    res.render('sales_report', { allReport, context: 'Report' })
  }

  getSaleById = async (req, res) => {
    const datas = {
      product: await saleModel.findOne({ id: req.params.id }),
      vendors: await vendorModel.find(),
      allProduct: await productModel.find(),
      context: 'Edit sales report',
    }
    res.render('sales_edit_page', datas)
  }

  addSalesPage = async (req, res) => {
    const datas = {
      vendors: await vendorModel.vendorByStatus({ status: 1 }),
      products: await productModel.find(),
      context: 'Add new sale',
    }
    res.render('add_sales', datas)
  }

  create = async (req, res) => {
    const saleDatas = req.body
    const quantity = Number(saleDatas.qty)
    req.body.order_date = new Date()
    req.body.delivery_date = 'Pending'

    const productInfo = await productModel.findOne({
      product_name: saleDatas.product_name,
    })

    const currentStockOutInTbl = productInfo.stock_out
    const currentStockAvailableInTbl = productInfo.stock_available

    if (
      currentStockAvailableInTbl <= 0 ||
      quantity > currentStockAvailableInTbl
    ) {
      req.flash(
        'error_msg',
        'Not enough stock available for this sale. Please select a different item!',
      )
      res.redirect('/sales/add')
    } else {
      const updateStockAvailableInTbl = currentStockAvailableInTbl - quantity
      const updateStockOutInTbl = Number(currentStockOutInTbl) + quantity

      const insertSale = await saleModel.create(saleDatas)
      if (insertSale)
        await this.updateProduct(
          updateStockAvailableInTbl,
          updateStockOutInTbl,
          saleDatas.product_name,
        )
      req.flash('success_msg', 'Successfully added sales.')
      res.redirect('/sales/add')
    }
  }

  updateSales = async (req, res) => {
    const saleDatas = req.body
    const quantity = Number(saleDatas.qty)

    const productInfo = await productModel.findOne({
      product_name: saleDatas.product_name,
    })

    const currentStockOutInTbl = parseInt(productInfo.stock_out)
    const currentStockAvailableInTbl = parseInt(productInfo.stock_available)

    const getCurrentProduct = await saleModel.findOne({ id: req.params.id })
    const getCurrentQty = parseInt(getCurrentProduct.qty)

    if (saleDatas.order_status === 'Delivered') {
      req.body.delivery_date = new Date()
    }
    if (getCurrentQty === quantity) {
      const update = await saleModel.update(saleDatas, req.params.id)
      if (update) req.flash('success_msg', 'Sales Updated Successfully!')
      res.redirect('/sales/reports')
    }

    if (getCurrentQty > quantity || getCurrentQty < quantity) {
      // difference of productInd and inputQty
      const getQuantity = getCurrentQty - quantity
      const updateStockAvailableInTbl = currentStockAvailableInTbl + getQuantity
      const updateStockOutInTbl = currentStockOutInTbl - getQuantity

      if (getQuantity > currentStockAvailableInTbl) {
        req.flash('error_msg', 'Not enough stock for this sales!')
        res.redirect('/sales/reports')
      } else {
        const update = await saleModel.update(saleDatas, req.params.id)
        if (update)
          await this.updateProduct(
            updateStockAvailableInTbl,
            updateStockOutInTbl,
            saleDatas.product_name,
          )
        req.flash('success_msg', 'Sales Updated Successfully!')
        res.redirect('/sales/reports')
      }
    }
  }

  salesDetails = async (req, res) => {
    const data = await productModel.findOne({
      product_name: req.body.product_name,
    })
    res.json({ data: data })
  }

  updateProduct = async (
    updateStockAvailableInTbl,
    updateStockOutInTbl,
    product_name,
  ) => {
    return await productModel.updateSaleProduct(
      {
        stock_available: updateStockAvailableInTbl,
        stock_out: updateStockOutInTbl,
      },
      product_name,
    )
  }
}

module.exports = new SalesController()
