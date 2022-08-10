const { Router } = require('express');
const DespesaController = require('../controllers/DespesaController');

const router = Router();

router.get('/despesas', DespesaController.pegaUmaDespesaPorDescricao);
router.get('/despesas/:id?', DespesaController.pegaUmaDespesa);
router.get('/despesas/:ano/:mes', DespesaController.pegaDespesasDoMes);
router.post('/despesas/', DespesaController.criaDespesa);
router.put('/despesas/:id?', DespesaController.atualizaDespesa);
router.delete('/despesas/:id?', DespesaController.removeDespesa);
router.post('/despesas/:id/restaura', DespesaController.restauraDespesa);

module.exports = router;