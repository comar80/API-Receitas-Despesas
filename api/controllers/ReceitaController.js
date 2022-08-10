const {ReceitasServices} = require('../services')
const receitasServices = new ReceitasServices
const sequelize = require('sequelize')
const { Op } = require("sequelize");


class ReceitaController {

  // Se nenhum parâmetro for passado pega todos os registros
  static async pegaUmaReceitaPorDescricao(req, res) {
    const descricao = req.query.descricao
    try {
      if (!descricao){
        const todasAsReceitas = await receitasServices.pegaTodosOsRegistros()
        return res.status(200).json(todasAsReceitas) 
      }
      
      const umaReceita = await receitasServices.pegaUmRegistro({descricao})
      if (umaReceita === null){
        return res.status(404).json("Nenhuma receita com esta descrição") 
      }

      return res.status(200).json(umaReceita)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaReceita(req, res) {
    const { id } = req.params
    try {
      const umaReceita = await receitasServices.pegaUmRegistro({id})
      return res.status(200).json(umaReceita)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaReceitasDoMes(req, res) {
    const {ano, mes} = req.params

    try {
      const receitasDoMes = await receitasServices.pegaTodosOsRegistros({
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano),
        ]
    })
      return res.status(200).json(receitasDoMes)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaReceita(req, res) {
    const novaReceita = req.body

    const novaDescricao = req.body.descricao
    const data = new Date(req.body.data)
    const mes = (data.getMonth() + 1)
    const ano = data.getFullYear()

    try {
      const descricaoExistente = await receitasServices.pegaUmRegistro({
        [Op.and]: [
          { descricao: novaDescricao },
          sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano),
        ]
    })

      if (descricaoExistente !== null) {
        return res.status(400).json(`Descrição existente para o respectivo mês e ano`)
      }

      const novaReceitaCriada = await receitasServices.criaRegistro(novaReceita)
      return res.status(200).json(novaReceitaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaReceita(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await receitasServices.atualizaRegistro(novasInfos, id)
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removeReceita(req, res) {
    const { id } = req.params
    try {
      await receitasServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraReceita(req, res) {
    const {id} = req.params
    try {
      await receitasServices.restauraRegistro(id)
      return res.status(200).json({mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = ReceitaController;