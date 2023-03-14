const bcrypt = require('bcryptjs')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const vendorModel = require('../models/vendor.model')
const salesModel = require('../models/sale.model')
const EmailSender = require('../utils/email.sender')
const emailSender = new EmailSender()

class UserController {
  getAllusers = async (req, res, next) => {
    let allUser = await userModel.find()
    res.render('users_tbl', { allUser, context: 'All users' })
  }

  createUserPage = async (req, res) => {
    res.render('create-user', { context: 'Add user' })
  }

  getUserById = async (req, res, next) => {
    const user = await userModel.findOne({ id: req.params.id })
    res.render('edit_user', { user, context: 'Edit user' })
  }

  createUser = async (req, res, next) => {
    const userData = req.body

    const emailExist = await userModel.findOne({ email: userData.email })
    if (emailExist) {
      req.flash('error_msg', 'This email already exist!')
      res.redirect('/user/add')
    } else {
      await this.hashPassword(req)
      userData.image = req.file.filename

      const createUser = await userModel.create(userData)
      /**
       * send mail to rercently created user
       */
      if (createUser) req.flash('success_msg', 'User was added successfully!')
      res.redirect('/user/add')
    }
  }

  updateuser = async (req, res, next) => {
    const userData = req.body

    if (req.file) {
      userData.image = req.file.filename
    }

    const updateUser = await userModel.update(userData, req.params.id)
    if (updateUser) {
      req.flash('success_msg', 'User was updated successfully!')
      res.redirect('/user/all')
    }
  }

  resetPassword = async (req, res, next) => {
    const userInfo = req.body

    const user = await userModel.findOne({ username: userInfo.username })
    console.log(user)

    if (!user) {
      res.JSON({
        msg: "This user doesn't exist",
      })
    } else {
      // send some messages on success
      const resetPassword = await userModel.resetPassword(userInfo, user.id)
      if (resetPassword) {
        res.JSON({
          msg: 'Password was change succesfully!',
          status: 200,
        })
      }

      // if (resetPassword)
      //   req.flash('success_msg', 'Password was changed successfully!')
      // req.flash('/user/login')
    }
  }

  dashboard = async (req, res, next) => {
    const datas = {
      totalProduct: await productModel.countTotalProduct(),
      totalUsers: await userModel.countTotalUser(),
      totalVendor: await vendorModel.countTotalVendor(),
      totalReport: await salesModel.countTotalSales(),
      context: 'Dashboard',
    }

    res.render('root_dashboard', datas)
  }

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
  }
}

module.exports = new UserController()
