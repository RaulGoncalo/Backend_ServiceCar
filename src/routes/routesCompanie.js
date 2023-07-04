import express from 'express';
import controllerCompanie from "../controllers/controllerCompanie.js";
import controllerAutentication from '../controllers/controllerAutentication.js';
import auth from '../auth/auth.js';

const router = express.Router();

// Define uma rota POST para criar uma empresa com login e endereço
router.post("/", controllerCompanie.createCompanieWithLoginWithAdress);

// Define uma rota POST para autenticação/login
router.post("/login", controllerAutentication.autentication);

// Define uma rota GET para verificar o token de autenticação
// A função `auth.validatedToken` é usada como middleware para validar o token antes de prosseguir
router.get("/checkToken", auth.validatedToken, (_, res) => {
    res.end();
});

// Exporta o objeto Router como padrão
export default router;
