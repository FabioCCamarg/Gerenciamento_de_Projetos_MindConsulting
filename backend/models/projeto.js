const connection = require('../config/db');

const Projeto = {
    criar: async (projeto) => {
        const [result] = await connection.promise().query(
            'INSERT INTO projetos (nome, descricao, usuarioId) VALUES (?, ?, ?)',
            [projeto.nome, projeto.descricao, projeto.usuarioId]
        );
        return result.insertId;
    },
    obterTodos: async () => {
        const [rows] = await connection.promise().query('SELECT * FROM projetos');
        return rows;
    },
    obterPorId: async (id) => {
        const [rows] = await connection.promise().query('SELECT * FROM projetos WHERE id = ?', [id]);
        return rows[0];
    },
    atualizar: async (id, projeto) => {
        await connection.promise().query(
            'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?',
            [projeto.nome, projeto.descricao, id]
        );
    },
    deletar: async (id) => {
        await connection.promise().query('DELETE FROM projetos WHERE id = ?', [id]);
    }
};

module.exports = Projeto;