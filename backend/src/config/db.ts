import mysql from 'mysql2';

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'root',      // Usuário do MySQL
    password: 'sua_senha', // Senha do MySQL
    database: 'gerenciamento_projetos' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL como id', connection.threadId);
});

export default connection;