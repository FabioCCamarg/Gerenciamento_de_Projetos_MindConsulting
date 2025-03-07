const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' '); // Formato: Bearer <token>

    try {
        const decoded = jwt.verify(token, authConfig.secret);
        req.usuarioId = decoded.id; // Adiciona o ID do usuário à requisição
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};