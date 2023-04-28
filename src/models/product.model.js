const query = require('../db/db-connection')
const { multipleColumnSet } = require('../utils/common.utils')

class ProductModel {
  tableName = 'products'

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

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    const result = await query(sql, [...values])
    return result[0]
  }

  create = async ({
    product_name,
    uty_price,
    stock_in,
    image,
    stock_available,
  }) => {
    const sql = `INSERT INTO ${this.tableName} 
    (product_name, uty_price, stock_in, image, stock_available,stock_out) VALUES(?,?,?,?,?,?)`

    return await query(sql, [
      product_name,
      uty_price,
      stock_in,
      image,
      stock_available,
      stock_out = 0
    ])
  }

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`
    const result = await query(sql, [...values, id])
    return result
  }

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
    const result = await query(sql, [id])
    return result
  }

  countTotalProduct = async (params = {}) => {
    let sql = `SELECT COUNT(*) AS id_count FROM ${this.tableName}`

    // if no keys available in objects
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = multipleColumnSet(params)
    sql += `WHERE ${columnSet}`

    return await query(sql, [...values])
  }

  updateSaleProduct = async (params, product_name) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE product_name = ?`
    const result = await query(sql, [...values, product_name])
    return result
  }
}

module.exports = new ProductModel()
