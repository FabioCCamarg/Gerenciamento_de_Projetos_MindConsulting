import express, { Request, Response, NextFunction } from 'express';
import usuarioRouter from './routes/usuario';
import projetoRouter from './routes/projeto';
import tarefaRouter from './routes/tarefa';
import authRouter from './routes/auth';
import protegidoRoutes from './routes/protegido';
import authMiddleware from './middlewares/authMiddleware'; // Importe o middleware

const app = express();

app.use(express.json());

// Rotas públicas (não requerem autenticação)
app.use('/auth', authRouter);

// Rotas protegidas (requerem autenticação)
app.use('/usuario', authMiddleware, usuarioRouter);
app.use('/projeto', authMiddleware, projetoRouter);
app.use('/tarefa', authMiddleware, tarefaRouter);
app.use('/protegido', authMiddleware, protegidoRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));