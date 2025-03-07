const Usuario = require('../models/usuario');

exports.criarUsuario = async (req, res) => {
    try {
        const id = await Usuario.criar(req.body);
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obterTodos = async (req, res) => {
    try {
        const usuarios = await Usuario.obterTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obterPorId = async (req, res) => {
    try {
        const usuario = await Usuario.obterPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        await Usuario.atualizar(req.params.id, req.body);
        res.status(200).json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletarUsuario = async (req, res) => {
    try {
        await Usuario.deletar(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};