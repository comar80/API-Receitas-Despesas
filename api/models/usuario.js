'use strict'
const {
  Model
} = require('sequelize')

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate (models) {
      // define association here
    }
  }
  Usuario.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        }
      }
    },
    senha: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (usuario, options) => {
        const senhaHash = await bcrypt.hash(usuario.senha, 12)
        usuario.senha = senhaHash
      }
    },
    sequelize,
    modelName: 'Usuario',
    paranoid: true
  })

  return Usuario
}
