const express = require('express');
const app = express();
const usuarioRouter = require('./routes/usuario');
const projetoRouter = require('./routes/projeto');
const tarefaRouter = require('./routes/tarefa');

app.use(express.json());

// Rotas
app.use('/usuario', usuarioRouter);
app.use('/projeto', projetoRouter);
app.use('/tarefa', tarefaRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));