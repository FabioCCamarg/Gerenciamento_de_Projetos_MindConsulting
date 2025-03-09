import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { nome, email, senha: password });
      alert("Registro realizado com sucesso!");
      navigate("/projects");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-4 mb-4 text-uppercase">Cadastro</h1>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setName(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={handleRegister}
          >
            Registrar
          </button>
          <button
            className="btn btn-secondary btn-lg w-100"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
