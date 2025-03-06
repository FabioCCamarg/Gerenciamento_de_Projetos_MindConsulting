const projetos = require('../models/projeto');

// Criar um projeto
exports.criarProjeto = (req, res) => {
    const { nome, descricao, usuarioId } = req.body;

    if (!nome || !usuarioId) {
        return res.status(400).json({ error: 'Nome e ID do usuário são obrigatórios' });
    }

    const novoProjeto = { id: projetos.length + 1, nome, descricao, usuarioId };
    projetos.push(novoProjeto);

    res.status(201).json(novoProjeto);
};

// Obter todos os projetos
exports.obterTodos = (req, res) => {
    res.status(200).json(projetos);
};

// Obter um projeto por ID
exports.obterPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const projeto = projetos.find(p => p.id === id);

    if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.status(200).json(projeto);
};

// Atualizar um projeto
exports.atualizarProjeto = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;

    const projeto = projetos.find(p => p.id === id);

    if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    projeto.nome = nome || projeto.nome;
    projeto.descricao = descricao || projeto.descricao;

    res.status(200).json(projeto);
};

// Deletar um projeto
exports.deletarProjeto = (req, res) => {
    const id = parseInt(req.params.id);
    const index = projetos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    projetos.splice(index, 1);
    res.status(204).send(); // 204 = No Content
};