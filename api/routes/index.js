const bodyParser = require('body-parser');
const receitas = require('./receitasRoute');
const despesas = require('./despesasRoute');
const resumo = require('./resumoRoute');


module.exports = app => {
    app.use(
        bodyParser.json(),
        receitas,
        despesas,
        resumo
        )
}
