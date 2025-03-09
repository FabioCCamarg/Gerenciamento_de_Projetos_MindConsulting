const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de tarefa
router.post('/projeto/:projectId/tarefa',authMiddleware, tarefaController.criarTarefa); // Criar tarefa
router.get('/',authMiddleware, tarefaController.obterTodas); // Obter todas as tarefas
router.get('/:id',authMiddleware, tarefaController.obterPorId); // Obter uma tarefa por ID
router.put('/:id',authMiddleware, tarefaController.atualizarTarefa); // Atualizar uma tarefa
router.delete('/:id',authMiddleware, tarefaController.deletarTarefa); // Deletar uma tarefa

module.exports = router;