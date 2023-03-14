const vendorModel = require('../models/vendor.model')
const dotenv = require('dotenv')
dotenv.config()

// vendor controller
class VendorController {
  getAllVendors = async (req, res, next) => {
    let allVendor = await vendorModel.find()
    res.render('vendors_tbl', { allVendor, context: 'All Vendors' })
  }

  addNewVendor = async (req, res, next) => {
    res.render('add_vendor', {
      context: 'Add new Vendor',
    })
  }

  getVendorById = async (req, res, next) => {
    const vendor = await vendorModel.findOne({ id: req.params.id })
    res.render('edit_vendor', { vendor, context: 'Edit Vendor' })
  }

  create = async (req, res, next) => {
    const vendorData = req.body
    const vendorInfo = await vendorModel.findOne({
      vendor_name: vendorData.vendor_name,
    })

    if (vendorInfo) {
      req.flash(
        'error_msg',
        `This vendor name ${vendorData.vendor_name} alredy exist!`,
      )
      res.redirect('/vendor/add')
    } else {
      vendorData.date = new Date()
      const createVendorInfo = await vendorModel.create(req.body)
      if (createVendorInfo)
        req.flash('success_msg', 'vendor was added successfuly!')
      res.redirect('/vendor/add')
    }
  }

  updateVendor = async (req, res, next) => {
    const updateVendor = await vendorModel.update(req.body, req.params.id)

    if (updateVendor) req.flash('success_msg', 'vendor updated successfuly!')
    res.redirect('/vendor/all')
  }
}

module.exports = new VendorController()
