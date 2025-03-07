import { RowDataPacket } from 'mysql2';
import connection from '../config/db';

interface Projeto {
    id: number;
    nome: string;
    descricao: string;
    usuarioId: number;
}

const Projeto = {
    criar: async (projeto: Omit<Projeto, 'id'>): Promise<number> => {
        const [result] = await connection.promise().query(
            'INSERT INTO projetos (nome, descricao, usuarioId) VALUES (?, ?, ?)',
            [projeto.nome, projeto.descricao, projeto.usuarioId]
        );
        return (result as any).insertId;
    },

    obterTodos: async (): Promise<Projeto[]> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM projetos');
        return rows as Projeto[];
    },

    obterPorId: async (id: number): Promise<Projeto | null> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM projetos WHERE id = ?', [id]);
        return rows[0] as Projeto || null;
    },

    atualizar: async (id: number, projeto: Partial<Projeto>): Promise<void> => {
        await connection.promise().query(
            'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?',
            [projeto.nome, projeto.descricao, id]
        );
    },

    deletar: async (id: number): Promise<void> => {
        await connection.promise().query('DELETE FROM projetos WHERE id = ?', [id]);
    }
};

export default Projeto;