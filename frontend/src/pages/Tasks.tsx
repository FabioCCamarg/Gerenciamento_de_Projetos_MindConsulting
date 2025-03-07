import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  description: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const navigate = useNavigate();

  // Carrega os projetos ao carregar a página
  useEffect(() => {
    fetchProjects();
  }, []);

  // Função para buscar projetos
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/projects'); // Substitua pela URL da sua API
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  // Função para criar um novo projeto
  const handleCreateProject = async () => {
    try {
      const response = await axios.post('http://localhost:3000/projects', {
        name: newProjectName,
        description: newProjectDescription,
      });
      setProjects([...projects, response.data]);
      setNewProjectName('');
      setNewProjectDescription('');
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  // Função para navegar para a página de tarefas de um projeto
  const handleViewTasks = (projectId: number) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <div>
      <h1>Projetos</h1>

      {/* Formulário para criar um novo projeto */}
      <div>
        <input
          type="text"
          placeholder="Nome do projeto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição do projeto"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <button onClick={handleCreateProject}>Criar Projeto</button>
      </div>

      {/* Lista de projetos */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button onClick={() => handleViewTasks(project.id)}>Ver Tarefas</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;