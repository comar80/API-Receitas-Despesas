const redis = require('redis')
const manipulaLista = require('./manipula-lista')
const allowlist = redis.createClient(
  {
    prefix: 'allowlist-refresh-token:',
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  }
)

module.exports = manipulaLista(allowlist)
