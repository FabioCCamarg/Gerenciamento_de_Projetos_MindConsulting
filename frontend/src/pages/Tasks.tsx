import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Tasks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Busca as tarefas ao carregar a página
  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/projeto/${projectId}/tarefa`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Dados da API", response.data );
      setTasks(response.data);
    } catch (error) {
      setError("Erro ao buscar tarefas.");
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle || !newTaskDescription) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/api/projeto/${projectId}/tarefa`,
        {
          title: newTaskTitle,
          description: newTaskDescription,
          status: "Pendente",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza a lista de tarefas
      setTasks([...tasks, response.data]);

      // Limpa os campos e exibe mensagem de sucesso
      setNewTaskTitle("");
      setNewTaskDescription("");
      setError("");
      setSuccessMessage("Tarefa criada com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000); // Remove a mensagem após 3 segundos
    } catch (error) {
      setError("Erro ao criar tarefa.");
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tarefa/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza a lista de tarefas
      setTasks(tasks.filter((t) => t.id !== taskId));

      // Exibe mensagem de sucesso
      setSuccessMessage("Tarefa excluída com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Erro ao excluir tarefa.");
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleBackProject = async () => navigate(-1);

  const handleUpdateTaskStatus = async (taskId: number, newStatus: string) => {

    console.log("Task ID:", taskId); // Verifique se o taskId está definido
    console.log("New Status:", newStatus); // Verifique o novo status

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/api/tarefa/${taskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza o estado local das tarefas
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // Exibe mensagem de sucesso
      setSuccessMessage("Status da tarefa atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Erro ao atualizar status da tarefa.");
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tarefas do Projeto {projectId}</h1>

      {/* Mensagens de erro e sucesso */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Formulário para criar tarefa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="form-control mb-2"
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleCreateTask}>
            Criar Tarefa
          </button>
          <button className="btn btn-primary" onClick={handleBackProject}>
            Voltar
          </button>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="list-group">
        {tasks.map((task) => (
          <div key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            {/* Dropdown para atualizar o status */}
            <select
              value={task.status}
              onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
              className="form-control mb-2"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
            </select>

            {/* Botão para excluir tarefa */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTask(task.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;