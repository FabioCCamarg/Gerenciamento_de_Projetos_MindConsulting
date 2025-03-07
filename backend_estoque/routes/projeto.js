const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas protegidas
router.post('/', authMiddleware, projetoController.criarProjeto);
router.get('/', authMiddleware, projetoController.obterTodos);
router.get('/:id', authMiddleware, projetoController.obterPorId);
router.put('/:id', authMiddleware, projetoController.atualizarProjeto);
router.delete('/:id', authMiddleware, projetoController.deletarProjeto);

module.exports = router;