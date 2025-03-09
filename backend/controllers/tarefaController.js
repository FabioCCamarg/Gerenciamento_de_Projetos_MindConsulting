const Tarefa = require("../models/tarefa");

// Criar uma tarefa
exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, status, projetoId, usuarioId } = req.body;

  if (!titulo || !projetoId || !usuarioId) {
    return res.status(400).json({
      error: "Título, ID do projeto e ID do usuário são obrigatórios",
    });
  }

  try {
    const id = await Tarefa.criar({
      titulo,
      descricao,
      status: status || "pendente",
      projetoId,
      usuarioId,
    });
    res
      .status(201)
      .json({ id, titulo, descricao, status, projetoId, usuarioId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as tarefas
exports.obterTodas = async (req, res) => {
  try {
    const { projectId, usuarioId } = req.params; // Extrai projectId e usuarioId dos parâmetros da URL

    // Chama o método do model para obter todas as tarefas
    const tarefas = await Tarefa.obterTodas(projectId, usuarioId);

    // Retorna as tarefas encontradas
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma tarefa por ID
exports.obterPorId = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const tarefa = await Tarefa.obterPorId(id);
    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma tarefa
exports.atualizarTarefa = async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, status } = req.body;

  try {
    await Tarefa.atualizar(id, { titulo, descricao, status });
    res.status(200).json({ id, titulo, descricao, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma tarefa
exports.deletarTarefa = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await Tarefa.deletar(id);
    res.status(204).send(); // 204 = No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza Status
exports.atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params; // ID da tarefa
        const { status } = req.body; // Novo status

        // Validação do status
        const statusValidos = ["Pendente", "Em Andamento", "Concluída"];
        if (!statusValidos.includes(status)) {
            return res.status(400).json({ error: "Status inválido." });
        }

        // Atualiza o status da tarefa
        await Tarefa.atualizarStatus(id, status);

        res.status(200).json({ message: "Status atualizado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
