const query = require('../db/db-connection')
const { multipleColumnSet } = require('../utils/common.utils')

class SaleModel {
  tableName = 'sales'

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName} ORDER BY order_status DESC`

    // if no keys available in objects
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = multipleColumnSet(params)
    sql += `WHERE ${columnSet}`

    const result = await query(sql, [...values])
    return result
  }

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    const result = await query(sql, [...values])
    return result[0]
  }

  create = async ({
    vendor,
    stockAvailable,
    product_name,
    invoice_no,
    status,
    qty,
    unity_price,
    amount_paid,
    balance,
    total_amount,
    order_date,
    delivery_date,
    comment,
  }) => {
    const sql = `INSERT INTO ${this.tableName} 
    (vendor,
      stockAvailable,
      product_name,
      invoice_no,
      status,
      qty,
      unity_price,
      amount_paid,
      balance,
      total_amount,
      order_date,
      delivery_date,
      comment
      ) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`

    return await query(sql, [
      vendor,
      stockAvailable,
      product_name,
      invoice_no,
      status,
      qty,
      unity_price,
      amount_paid,
      balance,
      total_amount,
      order_date,
      delivery_date,
      comment,
    ])
  }

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`
    const result = await query(sql, [...values, id])
    return result
  }

  filter = async ({ from, to }) => {
    const sql = `SELECT * FROM 
    ${this.tableName} WHERE order_date BETWEEN 
    ? AND ? ORDER BY id DESC`

    const result = await query(sql, [from, to])
    return result
  }

  countTotalSales = async (params = {}) => {
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

module.exports = new SaleModel()
