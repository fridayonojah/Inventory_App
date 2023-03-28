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
    /***
     * TODO
     * 1 get user email to retrive records from the db if exist
     * 2 generate a ramdom strings as password that user
     * 3 send a mail to user email add given containing
     * the user user email and genrated password for loging
     */

    const { comfirm_password, ...otherInfo } = req.body

    // check if password match
    if (comfirm_password !== otherInfo.password) {
      req.flash('error_msg', `Passwords didn't match!`)
      res.redirect('/user/password_reset')
    } else {
      const user = await userModel.findOne({ username: otherInfo.username })
      console.log(user)

      if (!user) {
        req.flash(
          'error_msg',
          `This user doesn't exist in our record  ${otherInfo.username}`,
        )
        res.redirect('/user/password_reset')
      } else {
        otherInfo.password = await this.hashPassword(otherInfo.password)
        const resetPassword = await userModel.resetPassword(
          otherInfo,
          otherInfo.username,
        )
        if (resetPassword) {
          req.flash(
            'success_msg',
            `Password was updated successfully. Please proceded to login`,
          )
          res.redirect('/user/password_reset')
        }
      }
    }
  }

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
  }

  // Admin dashboard
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
}

module.exports = new UserController()
