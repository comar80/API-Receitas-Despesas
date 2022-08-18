const { promisify } = require('util')

module.exports = lista => {
  const existsAsync = promisify(lista.exists).bind(lista)
  const setAsync = promisify(lista.set).bind(lista)
  const getAsync = promisify(lista.get).bind(lista)
  const delAsync = promisify(lista.del).bind(lista)

  return {
    async adiciona (chave, valor, dataExpiracao) {
      await setAsync(chave, valor)
      await lista.expireat(chave, dataExpiracao)
    },

    async contemChave (chave) {
      const resultado = await existsAsync(chave)
      return resultado === 1
    },

    async buscaValor (chave) {
      return getAsync(chave)
    },

    async deleta (chave) {
      await delAsync(chave)
    }
  }
}
