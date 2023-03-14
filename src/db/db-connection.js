const dotenv = require('dotenv')
dotenv.config()
const mysql2 = require('mysql2')

// This class is mainly for handling info related to the db

class DbConnection {
  constructor() {
    this.db = mysql2.createPool({
      host: sql8.freemysqlhosting.net,
      user: sql8604370,
      password: chB1NIfmSN,
      database: sql8604370,
    })

    this.checkConnection()
  }

  checkConnection() {
    this.db.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database connection has many connection')
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }
      if (connection) {
        connection.release()
      }
      return
    })
  }

  query = async (sql, values) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      }
      /**
       * Note:
       * execute will internally call prepare and query
       */
      this.db.execute(sql, values, callback)
    }).catch((err) => {
      const mysqlErrorList = Object.keys(HttpStatusCodes)
      // convert mysql error which in the mysqlErrorList
      err.status = mysqlErrorList.includes(err.code)
        ? HttpStatusCodes[err.code]
        : err.status

      throw err
    })
  }
}

// like enum
const HttpStatusCodes = Object.freeze({
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
  ER_DUP_ENTRY: 409,
})

// export controller
module.exports = new DbConnection().query
