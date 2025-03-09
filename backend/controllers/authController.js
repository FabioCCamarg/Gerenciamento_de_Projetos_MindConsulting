const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const authConfig = require("../config/auth");

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    console.log(req.body);

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o e-mail já existe
    const usuarioExistente = await Usuario.obterPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // Criptografa a senha e cadastra o usuário
    const senhaHash = await bcrypt.hash(senha, 10);
    const id = await Usuario.criar({ nome, email, senha: senhaHash });
    console.log("Senha inserida",senha);
    console.log("hash armazenada no banco",senhaHash)
    res.status(201).json({ id, nome, email });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("Corpo da requisição:", req.body); // Log para depuração
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios!" });
  }

  try {
    // Verifica se o usuario existe
    const usuario = await Usuario.obterPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: "Usuario não encontrado!" });
    }

    console.log("Senha fornecida:", senha); // Log para depuração
    console.log("Hash armazenado:", usuario.senha); // Log para depuração

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log("Senha válida:", senhaValida); // Log para depuração

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha Inválida!" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    // Remove a senha do objeto de resposta
    usuario.senha = undefined;

    res.status(200).json({ usuario, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
