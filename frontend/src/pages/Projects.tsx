import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Project {
  id: number;
  usuarioId: number;
  nome: string;
  descricao: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/projeto", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      setError("Erro ao buscar projetos.");
      console.error("Erro ao buscar projetos:", error);
    }
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
  if (confirmLogout) {
    localStorage.removeItem("token");
    navigate("/login");
  }
};

  const handleCreateProject = async () => {
    if (!newProjectName || !newProjectDescription) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Dados enviados:", {
        nome: newProjectName,
        descricao: newProjectDescription,
      });

      const response = await api.post(
        "/projeto",
        { nome: newProjectName, descricao: newProjectDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects([...projects, response.data]);
      setNewProjectName("");
      setNewProjectDescription("");
      setError(""); // Limpa o erro
      alert("Projeto criado com sucesso!"); // Feedback visual simples
    } catch (error) {
      setError("Erro ao criar projeto.");
      console.error("Erro ao criar projeto:", error);
    }
  };

  const handleEditProject = (projectId: number) => {
    navigate(`/projects/${projectId}/edit`); // Redireciona para a página de edição
  };

  const handleDeleteProject = async (projectId: number) => {
    // Confirmação antes de excluir
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/projeto/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza a lista de projetos no estado
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== projectId)
      );

      // Feedback visual (substitua por um componente de notificação, se possível)
      setSuccessMessage("Projeto excluído com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000); // Remove a mensagem após 3 segundos
    } catch (error) {
      setError("Erro ao excluir projeto.");
      console.error("Erro ao excluir projeto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Projetos</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome do projeto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Descrição do projeto"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          className="form-control mb-2"
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleCreateProject}>
            Criar Projeto
          </button>
          <button className="btn btn-primary" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      {/* Lista de projetos */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="list-group">
        {projects.map((project) => (
          <div key={project.usuarioId} className="list-group-item">
            <h5>{project.nome}</h5>
            <p>{project.descricao}</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() =>
                  navigate(`/api/projects/${project.id}/tasks`, {
                    state: { projeto: project },
                  })
                }
              >
                Ver Tarefas
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleEditProject(project.id)} // Botão de edição
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteProject(project.id)}
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

export default Projects;
