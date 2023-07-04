// Importação dos módulos e arquivos necessários
import serviceUser from "../services/serviceUser.js"
import serviceLogin from "../services/serviceLogin.js"
import db from "../database/config.js"

// Função para criar um usuário com login
const createUserWithLogin = async (req, res, next) => {
    // Extrair os dados do corpo da requisição
    const { name, phone } = req.body
    const { email, password } = req.body

    try {
        const missingFields = [];

        // Verificar se os campos obrigatórios estão presentes
        if (!name) {
            missingFields.push('nome');
        }
        if (!phone) {
            missingFields.push('telefone');
        }
        if (!email) {
            missingFields.push('email');
        }
        if (!password) {
            missingFields.push('senha');
        }

        // Verificar se há campos obrigatórios ausentes
        if (missingFields.length > 0) {
            const errorMessage = `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`;
            throw new Error(errorMessage);
        }

        // Iniciar uma transação
        const t = await db.transaction()

        try {
            // Criar o login do usuário
            const loginId = await serviceLogin.createLogin({ email, password }, t)

            // Criar o usuário
            const user = {
                name,
                phone,
                loginId
            }

            await serviceUser.createUser(user, t)

            // Efetuar o commit da transação
            await t.commit();

            res.status(201).send({ message: "Usuário criado com sucesso!" })
        } catch (error) {
            // Efetuar o rollback da transação em caso de erro
            await t.rollback();
            throw error;
        }


    } catch (error) {
        next(error)
    }
}

// Exportação da função
export default {
    createUserWithLogin
}
