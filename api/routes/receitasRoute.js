const { Router } = require('express');
const ReceitaController = require('../controllers/ReceitaController');

const router = Router();

router.get('/receitas', ReceitaController.pegaTodasAsReceitas);
router.get('/receitas/:id?', ReceitaController.pegaUmaReceita);
router.post('/receitas/', ReceitaController.criaReceita);
router.put('/receitas/:id?', ReceitaController.atualizaReceita);
router.delete('/receitas/:id?', ReceitaController.removeReceita);
router.post('/receitas/:id/restaura', ReceitaController.restauraReceita);

module.exports = router;