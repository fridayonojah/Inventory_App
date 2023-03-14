const query = require('../db/db-connection')
const { multipleColumnSet } = require('../utils/common.utils')

class VendorModel {
  tableName = 'vendors'

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName} ORDER BY id DESC`

    // if no keys available in objects
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = multipleColumnSet(params)
    sql += `WHERE ${columnSet}`

    return await query(sql, [...values])
  }

  vendorByStatus = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    return await query(sql, [...values])
  }

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    const result = await query(sql, [...values])
    return result[0]
  }

  create = async ({
    vendor_name,
    email,
    phone,
    status,
    date,
    address,
    city,
    state,
  }) => {
    const sql = `INSERT INTO ${this.tableName} 
    (vendor_name,
      email,
      phone,
      status,
      date,
      address,
      city,
      state) VALUES(?,?,?,?,?,?,?,?)`

    return await query(sql, [
      vendor_name,
      email,
      phone,
      status,
      date,
      address,
      city,
      state,
    ])
  }

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`
    const result = await query(sql, [...values, id])
    return result
  }

  countTotalVendor = async (params = {}) => {
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

module.exports = new VendorModel()
