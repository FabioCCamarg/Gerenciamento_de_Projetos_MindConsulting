import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProject = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Obtém o ID do projeto da URL
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Carrega os dados do projeto ao montar o componente
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/projeto/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
      } catch (error) {
        setError("Erro ao carregar projeto.");
        console.error("Erro ao carregar projeto:", error);
      }
    };
    

    fetchProject();
  }, [projectId]);

  // Função para atualizar o projeto
  const handleUpdateProject = async () => {
    if (!nome || !descricao) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/projeto/${projectId}`,
        { nome, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Projeto atualizado com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/projects"); // Redireciona de volta para a lista de projetos
      }, 3000);
    } catch (error) {
      setError("Erro ao atualizar projeto.");
      console.error("Erro ao atualizar projeto:", error);
    }
  };
  const handleBackProject = async () => navigate(-1);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Projeto</h1>
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome do projeto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Descrição do projeto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="form-control mb-2"
        />
        <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleUpdateProject}>
          Salvar Alterações
        </button>
        <button className="btn btn-primary" onClick={handleBackProject}>
            Voltar
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default EditProject;
