const { UsuarioServices } = require('../services')
const usuarioServices = new UsuarioServices()
const tokens = require('../tokens')

class UsuarioController {
  // Se nenhum parâmetro for passado pega todos os registros
  static async pegaUmUsuarioPorEmail (req, res) {
    const email = req.query.email
    try {
      if (!email) {
        const todosOsUsuarios = await usuarioServices.pegaTodosOsRegistros()
        return res.status(200).json(todosOsUsuarios)
      }

      const umUsuario = await usuarioServices.pegaUmRegistro({ email })
      if (umUsuario === null) {
        return res.status(404).json('Nenhum usuario com este email')
      }

      return res.status(200).json(umUsuario)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmUsuarioPorId (req, res) {
    const { id } = req.params
    try {
      const umUsuario = await usuarioServices.pegaUmRegistro({ id })
      return res.status(200).json(umUsuario)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaUsuario (req, res) {
    const novoUsuario = req.body
    try {
      const novoUsuarioCriado = await usuarioServices.criaRegistro(novoUsuario)
      return res.status(200).json(novoUsuarioCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaUsuario (req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await usuarioServices.atualizaRegistro(novasInfos, id)
      return res.status(204).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removeUsuario (req, res) {
    const { id } = req.params
    try {
      await usuarioServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraUsuario (req, res) {
    const { id } = req.params
    try {
      await usuarioServices.restauraRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async login (req, res) {
    try {
      const accessToken = tokens.access.cria(req.user.id)
      const refreshToken = await tokens.refresh.cria(req.user.id)
      res.set('Authorization', accessToken)
      res.status(200).send({ refreshToken })
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }

  static async logout (req, res) {
    try {
      const token = req.token
      await tokens.access.invalida(token)
      res.status(204).send()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
}

module.exports = UsuarioController
