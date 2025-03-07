import { RowDataPacket } from 'mysql2';
import connection from '../config/db';

interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: 'pendente' | 'em_andamento' | 'concluida';
    projetoId: number;
    usuarioId: number;
}

const Tarefa = {
    criar: async (tarefa: Omit<Tarefa, 'id'>): Promise<number> => {
        const [result] = await connection.promise().query(
            'INSERT INTO tarefas (titulo, descricao, status, projetoId, usuarioId) VALUES (?, ?, ?, ?, ?)',
            [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.projetoId, tarefa.usuarioId]
        );
        return (result as any).insertId;
    },

    obterTodas: async (): Promise<Tarefa[]> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM tarefas');
        return rows as Tarefa[];
    },

    obterPorId: async (id: number): Promise<Tarefa | null> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM tarefas WHERE id = ?', [id]);
        return rows[0] as Tarefa || null;
    },

    atualizar: async (id: number, tarefa: Partial<Tarefa>): Promise<void> => {
        await connection.promise().query(
            'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
            [tarefa.titulo, tarefa.descricao, tarefa.status, id]
        );
    },

    deletar: async (id: number): Promise<void> => {
        await connection.promise().query('DELETE FROM tarefas WHERE id = ?', [id]);
    }
};

export default Tarefa;