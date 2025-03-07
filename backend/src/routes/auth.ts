import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// Rota de login
router.post('/login', login);

export default router;