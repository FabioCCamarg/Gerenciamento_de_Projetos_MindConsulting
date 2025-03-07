import { Request, Response } from 'express';
import Projeto from '../models/projeto';

export const criarProjeto = async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, usuarioId } = req.body;

    if (!nome || !usuarioId) {
        res.status(400).json({ error: 'Nome e ID do usuário são obrigatórios' });
        return;
    }

    try {
        const id = await Projeto.criar({ nome, descricao, usuarioId });
        res.status(201).json({ id, nome, descricao, usuarioId });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const projetos = await Projeto.obterTodos();
        res.status(200).json(projetos);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const projeto = await Projeto.obterPorId(id);
        if (!projeto) {
            res.status(404).json({ error: 'Projeto não encontrado' });
            return;
        }
        res.status(200).json(projeto);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const atualizarProjeto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;

    try {
        await Projeto.atualizar(id, { nome, descricao });
        res.status(200).json({ id, nome, descricao });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const deletarProjeto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await Projeto.deletar(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};