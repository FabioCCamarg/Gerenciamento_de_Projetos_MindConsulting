const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rotas de tarefa
router.post('/', tarefaController.criarTarefa); // Criar tarefa
router.get('/', tarefaController.obterTodas); // Obter todas as tarefas
router.get('/:id', tarefaController.obterPorId); // Obter uma tarefa por ID
router.put('/:id', tarefaController.atualizarTarefa); // Atualizar uma tarefa
router.delete('/:id', tarefaController.deletarTarefa); // Deletar uma tarefa

module.exports = router;