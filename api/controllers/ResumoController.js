const { ReceitasServices } = require('../services')
const { DespesasServices } = require('../services')
const receitasServices = new ReceitasServices
const despesasServices = new DespesasServices

class ResumoController {

  static async pegaResumoDoMes(req, res) {
    const { ano, mes } = req.params

    try {
      let receitasDoMes = await receitasServices.somaTodosRegistrosDoMes(ano, mes);
      let despesasDoMes = await despesasServices.somaTodosRegistrosDoMes(ano, mes);

      receitasDoMes === null ? receitasDoMes = 0 : receitasDoMes;
      despesasDoMes === null ? despesasDoMes = 0 : despesasDoMes;

      const categorias = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras']
      const categoriaDespesa = [];
      const categoriaReceita = [];

      for (let cat of categorias) {
        let valorPorCategoria = await despesasServices.somaTodosRegistrosDoMesPorCategoria(ano, mes, cat)
        valorPorCategoria === null ? valorPorCategoria = 0 : valorPorCategoria
        categoriaDespesa.push(`valor de ${cat} é de R$${valorPorCategoria.toFixed(2)}`)
      }

      for (let cat of categorias) {
        let valorPorCategoria = await receitasServices.somaTodosRegistrosDoMesPorCategoria(ano, mes, cat)
        valorPorCategoria === null ? valorPorCategoria = 0 : valorPorCategoria
        categoriaReceita.push(`valor de ${cat} é de R$${valorPorCategoria.toFixed(2)}`)
      }

      const resumo = {
        receitas: `O valor total de receitas em ${mes}/${ano} é de R$${receitasDoMes.toFixed(2)}`,
        despesas: `O valor total de despesas em ${mes}/${ano} é de R$${despesasDoMes.toFixed(2)}`,
        saldo: `O saldo final em ${mes}/${ano} é de R$${(receitasDoMes - despesasDoMes).toFixed(2)}`,
        ReceitaTotalPorCategoria: categoriaReceita,
        DespesaTotalPorCategoria: categoriaDespesa,
      }

      return res.status(200).json(resumo)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = ResumoController;