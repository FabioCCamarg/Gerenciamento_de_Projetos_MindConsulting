import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        return;
    }

    try {
        const id = await Usuario.criar({ nome, email, senha });
        res.status(201).json({ id, nome, email });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await Usuario.obterTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const obterPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const usuario = await Usuario.obterPorId(id);
        if (!usuario) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;

    try {
        await Usuario.atualizar(id, { nome, email, senha });
        res.status(200).json({ id, nome, email });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};

export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await Usuario.deletar(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};