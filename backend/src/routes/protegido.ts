import express from 'express';
const router = express.Router();

// Rota protegida
router.get('/rota-protegida', (req, res) => {
    res.json({ message: 'Rota protegida acessada com sucesso!'});
});

export default router;