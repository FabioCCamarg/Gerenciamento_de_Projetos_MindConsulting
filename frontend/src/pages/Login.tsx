import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        senha: password,
      });
      localStorage.setItem("token", response.data.token);

      // Exibe mensagem de sucesso
      setSuccessMessage("Login realizado com sucesso!");

      // Limpa a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // 3000 milissegundos = 3 segundos

      // Redireciona para a página inicial após 3 segundos
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      // Limpa os campos de entrada
      setEmail("");
      setPassword("");
      // Remove a mensagem de erro após 5 segundos
      setTimeout(() => {
        setError("");
      }, 3000); // 5000 milissegundos = 5 segundos
    }
  };
  const handleBack = () => {
    navigate("/home"); // Redireciona para a página inicial
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="mb-4 text-uppercase">Login</h1>
      
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
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary btn-lg w-100" onClick={handleLogin}>
          Entrar
        </button>
        <button className="btn btn-secondary btn-lg w-100" onClick={handleBack}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Login;
