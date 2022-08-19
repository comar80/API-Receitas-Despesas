const { DespesasServices } = require('../services')
const despesasServices = new DespesasServices()
const sequelize = require('sequelize')
const { Op } = require('sequelize')

class DespesaController {
  // Se nenhum parâmetro for passado pega todos os registros
  static async pegaUmaDespesaPorDescricao (req, res) {
    const descricao = req.query.descricao
    try {
      if (!descricao) {
        const todasAsDespesas = await despesasServices.pegaTodosOsRegistros()
        return res.status(200).json(todasAsDespesas)
      }

      const umaDespesa = await despesasServices.pegaUmRegistro({ descricao })
      if (umaDespesa === null) {
        return res.status(404).json('Nenhuma despesa com esta descrição')
      }

      return res.status(200).json(umaDespesa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaDespesa (req, res) {
    const { id } = req.params
    try {
      const umaDespesa = await despesasServices.pegaUmRegistro({ id })
      return res.status(200).json(umaDespesa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaDespesasDoMes (req, res) {
    const { ano, mes } = req.params

    try {
      const despesasDoMes = await despesasServices.pegaTodosOsRegistros({
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano)
        ]
      })
      return res.status(200).json(despesasDoMes)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaDespesa (req, res) {
    const novaDespesa = req.body

    const novaDescricao = req.body.descricao
    const data = new Date(req.body.data)
    const mes = (data.getMonth() + 1)
    const ano = data.getFullYear()

    try {
      if (req.body.descricao === undefined) {
        throw new Error('Corpo da requisição não pode ser vazio')
      }

      const descricaoExistente = await despesasServices.pegaUmRegistro({
        [Op.and]: [
          { descricao: novaDescricao },
          sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano)
        ]
      })

      if (descricaoExistente !== null) {
        return res.status(400).json('Descrição existente para o respectivo mês e ano')
      }

      const novaDespesaCriada = await despesasServices.criaRegistro(novaDespesa)
      return res.status(201).json(novaDespesaCriada)
    } catch (error) {
      if (error.message === 'Corpo da requisição não pode ser vazio') {
        return res.status(400).json(error.message)
      }

      return res.status(500).json(error.message)
    }
  }

  static async atualizaDespesa (req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await despesasServices.atualizaRegistro(novasInfos, id)
      return res.status(204).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removeDespesa (req, res) {
    const { id } = req.params
    try {
      await despesasServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraDespesa (req, res) {
    const { id } = req.params
    try {
      await despesasServices.restauraRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = DespesaController
