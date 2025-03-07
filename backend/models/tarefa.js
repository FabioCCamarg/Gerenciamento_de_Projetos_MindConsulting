const connection = require('../config/db');

const Tarefa = {
    criar: async (tarefa) => {
        const [result] = await connection.promise().query(
            'INSERT INTO tarefas (titulo, descricao, status, projetoId, usuarioId) VALUES (?, ?, ?, ?, ?)',
            [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.projetoId, tarefa.usuarioId]
        );
        return result.insertId;
    },
    obterTodas: async () => {
        const [rows] = await connection.promise().query('SELECT * FROM tarefas');
        return rows;
    },
    obterPorId: async (id) => {
        const [rows] = await connection.promise().query('SELECT * FROM tarefas WHERE id = ?', [id]);
        return rows[0];
    },
    atualizar: async (id, tarefa) => {
        await connection.promise().query(
            'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
            [tarefa.titulo, tarefa.descricao, tarefa.status, id]
        );
    },
    deletar: async (id) => {
        await connection.promise().query('DELETE FROM tarefas WHERE id = ?', [id]);
    }
};

module.exports = Tarefa;