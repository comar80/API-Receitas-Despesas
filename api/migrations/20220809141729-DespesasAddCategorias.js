'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Despesas', 'categoria', {
      allowNull: true,
      type: Sequelize.ENUM('Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outros'),
      defaultValue: 'Outros',
      after: 'data'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Despesas', 'categoria')
  }
}
