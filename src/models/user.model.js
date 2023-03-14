const query = require('../db/db-connection')
const { multipleColumnSet } = require('../utils/common.utils')

class UserModel {
  tableName = 'users'

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`

    // if no keys available in objects
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = multipleColumnSet(params)
    sql += `WHERE ${columnSet}`

    return await query(sql, [...values])
  }

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    const result = await query(sql, [...values])
    return result[0]
  }

  // create users
  create = async ({
    email,
    fullname,
    password,
    username,
    status,
    phone,
    image,
    role,
  }) => {
    const sql = `INSERT INTO ${this.tableName} (email, fullname, password, username, status, phone, image, role) VALUES(?,?,?,?,?,?,?,?)`
    return await query(sql, [
      email,
      fullname,
      password,
      username,
      status,
      phone,
      image,
      role,
    ])
  }

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`
    const result = await query(sql, [...values, id])
    return result
  }

  resetPassword = async (params, username) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE username = ?`
    const result = await query(sql, [...values, username])
    return result
  }

  countTotalUser = async (params = {}) => {
    let sql = `SELECT COUNT(*) AS id_count FROM ${this.tableName}`

    // if no keys available in objects
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = multipleColumnSet(params)
    sql += `WHERE ${columnSet}`

    return await query(sql, [...values])
  }
}

module.exports = new UserModel()
