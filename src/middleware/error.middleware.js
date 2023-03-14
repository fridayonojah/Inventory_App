const winston = require('winston')
const winstonMysql = require('winston-mysql')
module.exports = function (err, req, res, next) {
  winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),

      new winstonMysql({
        host: 'localhost',
        user: 'logger',
        password: 'logger*test',
        database: 'allday_wipes',
        table: 'sys_logs_default',
      }),
    ],
  })

  // Send a friendly error message to the client
  res.render('error', {
    error: err,
  })
}
