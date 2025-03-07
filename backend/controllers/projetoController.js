const Projeto = require('../models/projeto');

// Criar um projeto
exports.criarProjeto = async (req, res) => {
    const { nome, descricao, usuarioId } = req.body;

    if (!nome || !usuarioId) {
        return res.status(400).json({ error: 'Nome e ID do usuário são obrigatórios' });
    }

    try {
        const id = await Projeto.criar({ nome, descricao, usuarioId });
        res.status(201).json({ id, nome, descricao, usuarioId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todos os projetos
exports.obterTodos = async (req, res) => {
    try {
        const projetos = await Projeto.obterTodos();
        res.status(200).json(projetos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um projeto por ID
exports.obterPorId = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const projeto = await Projeto.obterPorId(id);
        if (!projeto) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        res.status(200).json(projeto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um projeto
exports.atualizarProjeto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;

    try {
        await Projeto.atualizar(id, { nome, descricao });
        res.status(200).json({ id, nome, descricao });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um projeto
exports.deletarProjeto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await Projeto.deletar(id);
        res.status(204).send(); // 204 = No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};