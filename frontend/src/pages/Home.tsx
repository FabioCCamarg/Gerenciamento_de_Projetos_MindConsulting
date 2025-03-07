import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao Gerenciador de Projetos!</h1>
      <p>Esta é a página inicial. Escolha uma opção abaixo:</p>

      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Registrar</button>
    </div>
  );
};

export default Home;