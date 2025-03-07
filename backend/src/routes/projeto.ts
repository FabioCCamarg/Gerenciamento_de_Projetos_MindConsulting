import express from 'express';
import { criarProjeto, obterTodos, obterPorId, atualizarProjeto, deletarProjeto } from '../controllers/projetoController';

const router = express.Router();

router.post('/', criarProjeto);
router.get('/', obterTodos);
router.get('/:id', obterPorId);
router.put('/:id', atualizarProjeto);
router.delete('/:id', deletarProjeto);

export default router;