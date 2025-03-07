import { Request, Response } from 'express';
import Tarefa from '../models/tarefa';

export const criarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { titulo, descricao, status, projetoId, usuarioId } = req.body;

    if (!titulo || !projetoId || !usuarioId) {
        res.status(400).json({ error: 'Título, ID do projeto e ID do usuário são obrigatórios' });
        return;
    }

    try {
        const id = await Tarefa.criar({ titulo, descricao, status: status || 'pendente', projetoId, usuarioId });
        res.status(201).json({ id, titulo, descricao, status, projetoId, usuarioId });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterTodas = async (req: Request, res: Response): Promise<void> => {
    try {
        const tarefas = await Tarefa.obterTodas();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const tarefa = await Tarefa.obterPorId(id);
        if (!tarefa) {
            res.status(404).json({ error: 'Tarefa não encontrada' });
            return;
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const atualizarTarefa = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, status } = req.body;

    try {
        await Tarefa.atualizar(id, { titulo, descricao, status });
        res.status(200).json({ id, titulo, descricao, status });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const deletarTarefa = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await Tarefa.deletar(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};