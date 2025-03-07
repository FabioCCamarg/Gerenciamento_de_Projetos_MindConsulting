import { RowDataPacket } from 'mysql2';
import connection from '../config/db';
import bcrypt from 'bcrypt';

// Interface para o tipo Usuario
interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

const Usuario = {
    // Cria um novo usuário
    criar: async (usuario: Omit<Usuario, 'id'>): Promise<number> => {
        const hashedSenha = await bcrypt.hash(usuario.senha, 10); // Criptografa a senha
        const [result] = await connection.promise().query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [usuario.nome, usuario.email, hashedSenha]
        );
        return (result as any).insertId; // Retorna o ID do usuário criado
    },

    // Obtém todos os usuários
    obterTodos: async (): Promise<Usuario[]> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM usuarios');
        return rows as Usuario[];
    },

    // Obtém um usuário por ID
    obterPorId: async (id: number): Promise<Usuario | null> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0] as Usuario || null;
    },

    // Obtém um usuário por email
    obterPorEmail: async (email: string): Promise<Usuario | null> => {
        const [rows] = await connection.promise().query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0] as Usuario || null;
    },

    // Atualiza um usuário
    atualizar: async (id: number, usuario: Partial<Usuario>): Promise<void> => {
        const hashedSenha = usuario.senha ? await bcrypt.hash(usuario.senha, 10) : undefined; // Criptografa a senha, se fornecida
        await connection.promise().query(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [usuario.nome, usuario.email, hashedSenha, id]
        );
    },

    // Deleta um usuário
    deletar: async (id: number): Promise<void> => {
        await connection.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
    }
};

export default Usuario;