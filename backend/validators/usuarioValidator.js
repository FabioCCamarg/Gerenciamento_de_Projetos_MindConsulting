const { body, validationResult } = require('express-validator');

// Validações para criar/atualizar um usuário
const validarUsuario = [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('O e-mail deve ser válido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

// Middleware para verificar erros de validação
const verificarErros = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validarUsuario, verificarErros };