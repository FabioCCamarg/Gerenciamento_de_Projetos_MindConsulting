import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import authConfig from '../config/auth'; // Importação corrigida

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.obterPorEmail(email);
        if (!usuario) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id } as object, // Força a tipagem como object
            authConfig.secret as Secret, // Força a tipagem como Secret
            { expiresIn: authConfig.expiresIn } as SignOptions // Força a tipagem como SignOptions
        );

        // Remove a senha do objeto de resposta
        const usuarioSemSenha = { ...usuario, senha: undefined };
        res.status(200).json({ usuario: usuarioSemSenha, token });

        res.status(200).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
};