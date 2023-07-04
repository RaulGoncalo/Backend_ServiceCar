import express from 'express';

// Cria um objeto Router do Express
const router = express.Router();

// Define uma rota GET para a raiz ("/")
router.get("/", (req, res) => {
    // Retorna o status 200 (OK) como resposta
    res.sendStatus(200);
});

// Exporta o objeto Router como padrão
export default router;
