const database = require('../models')

const sequelize = require('sequelize')
const { Op } = require("sequelize");

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].findAll({where: { ...where }})
    }

    async pegaUmRegistro(where = {}){
        return database[this.nomeDoModelo].findOne({where: { ...where}})
    }

    async criaRegistro(novoRegistro){
        return database[this.nomeDoModelo].create(novoRegistro)
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id: id }}, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { ...where }}, transacao)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({ where: { id: id }})
    }

    async restauraRegistro(id){
        return database[this.nomeDoModelo].restore({ where: { id: id }})
    }

    async encontraEContaRegistros (where = {}, agregadores){
        return database[this.nomeDoModelo].findAndCountAll({ where: { ...where }, ...agregadores})
    }

    async somaTodosRegistrosDoMes(ano, mes) {

        return database[this.nomeDoModelo]
        .sum('valor',{ where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
              sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano),
            ]
        }})
    }

    async somaTodosRegistrosDoMesPorCategoria(ano, mes, categoria) {

        return database[this.nomeDoModelo]
        .sum('valor',{ where: {
            data: {
            [Op.and]: [
              sequelize.where(sequelize.fn('MONTH', sequelize.col('data')), mes),
              sequelize.where(sequelize.fn('YEAR', sequelize.col('data')), ano),
            ]
        },
        categoria: categoria
        }})
    }

}

module.exports = Services;