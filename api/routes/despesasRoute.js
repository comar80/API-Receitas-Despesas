const { Router } = require('express')
const DespesaController = require('../controllers/DespesaController')

const middlewaresAutenticacao = require('../middlewaresAutenticacao')

const router = Router()

router.get('/despesas', DespesaController.pegaUmaDespesaPorDescricao)
router.get('/despesas/:id?', DespesaController.pegaUmaDespesa)
router.get('/despesas/:ano/:mes', DespesaController.pegaDespesasDoMes)
router.post('/despesas/', middlewaresAutenticacao.bearer, DespesaController.criaDespesa)
router.put('/despesas/:id?', middlewaresAutenticacao.bearer, DespesaController.atualizaDespesa)
router.delete('/despesas/:id?', middlewaresAutenticacao.bearer, DespesaController.removeDespesa)
router.post('/despesas/:id/restaura', middlewaresAutenticacao.bearer, DespesaController.restauraDespesa)

module.exports = router
