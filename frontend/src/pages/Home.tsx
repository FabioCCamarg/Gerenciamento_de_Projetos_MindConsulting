import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-4 mb-4">Bem-vindo ao <span className="text-uppercase text-primary">gp</span>!</h1>
      <p className="lead mb-4">Esta é a página inicial. Escolha uma opção abaixo:</p>

      <div className="d-flex gap-3">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navigate('/register')}
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Home;