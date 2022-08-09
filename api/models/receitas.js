'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receitas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    data: DataTypes.DATE,
    categoria: DataTypes.ENUM("Alimentação", "Saúde", "Moradia", "Transporte", "Educação", "Lazer", "Imprevistos", "Outros")
  }, {
    sequelize,
    modelName: 'Receitas',
  });
  return Receitas;
};