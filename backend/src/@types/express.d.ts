// src/@types/express.d.ts
import 'express';

declare module 'express' {
    interface Request {
        usuarioId?: number; // Adiciona a propriedade usuarioId ao objeto Request
    }
}