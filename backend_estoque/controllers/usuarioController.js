const usuarios = require('../models/usuario');

// Criar um usuário
exports.criarUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, email, senha };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
};

// Obter todos os usuários
exports.obterTodos = (req, res) => {
    res.status(200).json(usuarios);
};

// Obter um usuário por ID
exports.obterPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
};

// Atualizar um usuário
exports.atualizarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.senha = senha || usuario.senha;

    res.status(200).json(usuario);
};

// Deletar um usuário
exports.deletarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);
    res.status(204).send(); // 204 = No Content
};