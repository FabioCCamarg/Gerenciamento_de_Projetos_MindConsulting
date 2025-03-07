import express from 'express';
import { criarTarefa, obterTodas, obterPorId, atualizarTarefa, deletarTarefa } from '../controllers/tarefaController';

const router = express.Router();

router.post('/', criarTarefa);
router.get('/', obterTodas);
router.get('/:id', obterPorId);
router.put('/:id', atualizarTarefa);
router.delete('/:id', deletarTarefa);

export default router;