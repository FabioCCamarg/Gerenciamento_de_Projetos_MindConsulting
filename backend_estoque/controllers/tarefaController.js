const tarefas = require('../models/tarefa');

// Criar uma tarefa
exports.criarTarefa = (req, res) => {
    const { titulo, descricao, status, projetoId, usuarioId } = req.body;

    if (!titulo || !projetoId || !usuarioId) {
        return res.status(400).json({ error: 'Título, ID do projeto e ID do usuário são obrigatórios' });
    }

    const novaTarefa = { id: tarefas.length + 1, titulo, descricao, status: status || 'pendente', projetoId, usuarioId };
    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
};

// Obter todas as tarefas
exports.obterTodas = (req, res) => {
    res.status(200).json(tarefas);
};

// Obter uma tarefa por ID
exports.obterPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(tarefa);
};

// Atualizar uma tarefa
exports.atualizarTarefa = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, status } = req.body;

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefa.titulo = titulo || tarefa.titulo;
    tarefa.descricao = descricao || tarefa.descricao;
    tarefa.status = status || tarefa.status;

    res.status(200).json(tarefa);
};

// Deletar uma tarefa
exports.deletarTarefa = (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefas.splice(index, 1);
    res.status(204).send(); // 204 = No Content
};