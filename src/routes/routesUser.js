import express from 'express';
import controllerUser from '../controllers/controllerUser.js';
import controllerAutentication from '../controllers/controllerAutentication.js';
import controllerCompanie from '../controllers/controllerCompanie.js'; // Importação do controlador de empresa
import auth from '../auth/auth.js';

const router = express.Router();

// Rota para criar um usuário com login
router.post("/", controllerUser.createUserWithLogin);

// Rota para autenticação/login
router.post("/login", controllerAutentication.autentication);

// Rota para verificar o token de autenticação
router.get("/checkToken", auth.validatedToken, (_, res) => {
    res.end();
});

// Middleware para validar o token em todas as rotas abaixo
router.use(auth.validatedToken);

// Rota para obter todas as empresas
router.get("/companies", controllerCompanie.getAllCompanies);

// Exporta o objeto Router como padrão
export default router;
