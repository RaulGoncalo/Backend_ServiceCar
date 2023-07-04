// Importação dos módulos e arquivos necessários
import serviceUser from "../services/serviceUser.js"
import serviceLogin from "../services/serviceLogin.js"
import serviceCompanie from "../services/serviceCompanie.js"

import jsonwebtoken from "jsonwebtoken"
import { KEY_TOKEN } from "../auth/auth.js"

// Função responsável por autenticar as credenciais
const autentication = async (req, res, next) => {
    try {
        // Decodifica as credenciais enviadas no cabeçalho da requisição
        const [, hash] = req.headers.authorization?.split(" ") || [" ", " "]

        // Verifica se as credenciais estão presentes
        if (!hash) {
            throw new Error("É necessário enviar as credenciais pelo cabeçalho.")
        }

        // Decodifica o hash para obter o email e a senha
        const [email, password] = Buffer.from(hash, "base64").toString().split(":")

        // Validação dos dados
        const missingFields = [];

        if (!email) {
            missingFields.push('email');
        }
        if (!password) {
            missingFields.push('senha');
        }

        // Verifica se há campos obrigatórios ausentes
        if (missingFields.length > 0) {
            const errorMessage = `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}.`;
            throw new Error(errorMessage);
        }

        // Busca as credenciais no serviço de login
        const credentials = await serviceLogin.findByEmail(email)

        if (credentials) {
            if (credentials.email === email && credentials.password === password) {
                let user

                // Verifica a rota base para determinar qual serviço usar
                if (req.baseUrl == "/user") {
                    user = await serviceUser.readUserByLoginId(credentials.loginId)
                }

                if (req.baseUrl == "/companie") {
                    user = await serviceCompanie.readCompanieByLoginId(credentials.loginId)
                }

                // Gera um token de autenticação usando o JSON Web Token (jsonwebtoken)
                const token = jsonwebtoken.sign(
                    { user: user },
                    KEY_TOKEN,
                )

                // Retorna o token no corpo da resposta
                res.status(200).send({ token })
            } else {
                // Credenciais inválidas
                res.status(401).send({ error: "Credenciais inválidas." })
            }
        } else {
            // Usuário não encontrado
            res.status(404).send({ error: "Usuário não encontrado." })
        }
    } catch (error) {
        // Encaminha o erro para o próximo middleware
        next(error)
    }
}

// Exporta a função de autenticação como um objeto
export default {
    autentication
}
