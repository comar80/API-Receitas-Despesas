const { Router } = require('express')
const ReceitaController = require('../controllers/ReceitaController')

const middlewaresAutenticacao = require('../middlewaresAutenticacao')

const router = Router()

router.get('/receitas', ReceitaController.pegaUmaReceitaPorDescricao)
router.get('/receitas/:id?', ReceitaController.pegaUmaReceita)
router.get('/receitas/:ano/:mes', ReceitaController.pegaReceitasDoMes)
router.post('/receitas/', middlewaresAutenticacao.bearer, ReceitaController.criaReceita)
router.put('/receitas/:id?', middlewaresAutenticacao.bearer, ReceitaController.atualizaReceita)
router.delete('/receitas/:id?', middlewaresAutenticacao.bearer, ReceitaController.removeReceita)
router.post('/receitas/:id/restaura', middlewaresAutenticacao.bearer, ReceitaController.restauraReceita)

module.exports = router
