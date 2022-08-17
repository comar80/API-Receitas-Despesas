const bodyParser = require('body-parser');
const receitas = require('./receitasRoute');
const despesas = require('./despesasRoute');
const resumo = require('./resumoRoute');
const usuarios = require('./usuarioRoute');



module.exports = app => {
    app.use(
        bodyParser.json(),
        receitas,
        despesas,
        resumo,
        usuarios
        )
}
