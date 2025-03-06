const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');

// Rotas de projeto
router.post('/', projetoController.criarProjeto); // Criar projeto
router.get('/', projetoController.obterTodos); // Obter todos os projetos
router.get('/:id', projetoController.obterPorId); // Obter um projeto por ID
router.put('/:id', projetoController.atualizarProjeto); // Atualizar um projeto
router.delete('/:id', projetoController.deletarProjeto); // Deletar um projeto

module.exports = router;