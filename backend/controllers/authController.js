const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const authConfig = require('../config/auth');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.obterPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: usuario.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

        // Remove a senha do objeto de resposta
        usuario.senha = undefined;

        res.status(200).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};