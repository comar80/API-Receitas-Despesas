const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const middlewaresAutenticacao = require('../middlewaresAutenticacao')

const router = Router();

router.get('/usuarios', UsuarioController.pegaUmUsuarioPorEmail);
router.get('/usuarios/:id', UsuarioController.pegaUmUsuarioPorId);

router.post('/usuarios/', UsuarioController.criaUsuario);
router.post('/usuarios/login', middlewaresAutenticacao.local, UsuarioController.login);
router.post('/usuarios/atualiza_token', middlewaresAutenticacao.refresh, UsuarioController.login);
router.post('/usuarios/logout', [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], UsuarioController.logout);

router.put('/usuarios/:id', UsuarioController.atualizaUsuario);
router.delete('/usuarios/:id', middlewaresAutenticacao.bearer,UsuarioController.removeUsuario);
router.post('/usuarios/:id/restaura', UsuarioController.restauraUsuario);

module.exports = router;