const connection = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {
    criar: async (usuario) => {
        const [result] = await connection.promise().query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [usuario.nome, usuario.email, usuario.senha]
            
        );
        return result.insertId;
    },
    obterTodos: async () => {
        const [rows] = await connection.promise().query('SELECT * FROM usuarios');
        return rows;
    },
    obterPorId: async (id) => {
        const [rows] = await connection.promise().query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },
    obterPorEmail: async (email) => {
        const [rows] = await connection.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    atualizar: async (id, usuario) => {
        const hashedSenha = await bcrypt.hash(usuario.senha, 10); // Criptografa a senha
        await connection.promise().query(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [usuario.nome, usuario.email, hashedSenha, id]
        );
    },
    deletar: async (id) => {
        await connection.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
    }
};

module.exports = Usuario;