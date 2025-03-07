import express from 'express';
import { criarUsuario, obterTodos, obterPorId, atualizarUsuario, deletarUsuario } from '../controllers/usuarioController';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', obterTodos);
router.get('/:id', obterPorId);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

export default router;