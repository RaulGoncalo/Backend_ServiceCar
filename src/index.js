import express from 'express';
import routesUser from "./routes/routesUser.js"; // Importação das rotas de usuário
import routesCompanie from "./routes/routesCompanie.js"; // Importação das rotas de empresa
import checkConnection from "./routes/checkConnection.js"; // Importação da rota de verificação de conexão
;
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js'; // Importe o arquivo de configuração do Swagger

const app = express();
app.use(express.json()); // Middleware para fazer o parsing de JSON

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/checkConnection", checkConnection); // Rota para verificar a conexão
app.use("/user", routesUser); // Rota para as operações relacionadas ao usuário
app.use("/companie", routesCompanie); // Rota para as operações relacionadas à empresa

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

app.listen(3000, () => {
    console.log("API_STARTED");
});
