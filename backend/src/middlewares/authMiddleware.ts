import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' '); // Formato: Bearer <token>

    try {
        const decoded = jwt.verify(token, authConfig.secret) as { id: number };
        req.usuarioId = decoded.id; // Adiciona o ID do usuário à requisição
        next(); // Chama o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export default authMiddleware;