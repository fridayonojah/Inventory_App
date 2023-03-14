const express = require('express')
const app = express()
require('dotenv').config()

require('./startup/logging')()
require('./startup/template')(app)
require('./startup/config')(app)
app.use(require('./startup/globals'))
require('./startup/route')(app)

// Start the app server
if (process.env.NODE_ENV) {
  const port = Number(process.env.PORT || 3000)
  app.listen(port, () => {
    console.log(`app is running on port http://localhost:${port}`)
  })
}

module.exports = app
