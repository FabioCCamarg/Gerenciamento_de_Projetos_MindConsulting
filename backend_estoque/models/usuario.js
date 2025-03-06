const connection = require('../config/db');

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
    atualizar: async (id, usuario) => {
        await connection.promise().query(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [usuario.nome, usuario.email, usuario.senha, id]
        );
    },
    deletar: async (id) => {
        await connection.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
    }
};

module.exports = Usuario;