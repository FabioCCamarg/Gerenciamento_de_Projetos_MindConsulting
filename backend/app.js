const express = require('express');
const app = express();
const usuarioRouter = require('./routes/usuario');
const projetoRouter = require('./routes/projeto');
const tarefaRouter = require('./routes/tarefa');
const authRouter = require('./routes/auth');
const protegidoRoutes = require('./routes/protegido');
const cors = require('cors');

app.use(cors()); 
app.use(express.json());

app.use('/auth', authRouter);
// Rotas
app.use('/usuario', usuarioRouter);
app.use('/projeto', projetoRouter);
app.use('/api', tarefaRouter);
app.use('/protegido', protegidoRoutes); 

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));