require('dotenv').config()

const express = require('express')
const routes = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')

const { estrategiasAutenticacao } = require('./estrategiasAutenticacao')

routes(app)

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`)
})

module.exports = app
