// Importação dos módulos e arquivos necessários
import serviceCompanie from "../services/serviceCompanie.js"
import serviceLogin from "../services/serviceLogin.js"
import serviceAddress from "../services/serviceAddress.js"
import db from "../database/config.js"

// Função para criar uma empresa com login e endereço
const createCompanieWithLoginWithAdress = async (req, res, next) => {
    // Extrair os dados do corpo da requisição
    const { name, cnpj, specialty, phone } = req.body
    const address = req.body.address
    const { email, password } = req.body

    try {
        const missingFields = [];

        // Verificar se os campos obrigatórios estão presentes
        if (!name) {
            missingFields.push('nome');
        }
        if (!cnpj) {
            missingFields.push('CNPJ');
        }
        if (!specialty) {
            missingFields.push('CNPJ');
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
        if (!address.cep) {
            missingFields.push('CEP');
        }
        if (!address.state) {
            missingFields.push('Estado');
        }
        if (!address.city) {
            missingFields.push('Cidade');
        }
        if (!address.street) {
            missingFields.push('Rua');
        }
        if (!address.number) {
            missingFields.push('Número');
        }

        // Verificar se há campos obrigatórios ausentes
        if (missingFields.length > 0) {
            const errorMessage = `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`;
            throw new Error(errorMessage);
        }

        // Iniciar uma transação
        const t = await db.transaction()

        try {
            // Criar o login da empresa
            const loginId = await serviceLogin.createLogin({ email, password }, t);

            // Criar o endereço da empresa
            const addressId = await serviceAddress.createAddress(address, t);

            // Criar a empresa
            const companie = {
                name,
                cnpj,
                specialty,
                phone,
                loginId,
                addressId
            };

            await serviceCompanie.createCompanie(companie, t);

            // Efetuar o commit da transação
            await t.commit();

            res.status(201).send({ message: "Empresa criada com sucesso!" });
        } catch (error) {
            // Efetuar o rollback da transação em caso de erro
            await t.rollback();
            throw error;
        }

    } catch (error) {
        next(error)
    }
}

// Função para obter todas as empresas
const getAllCompanies = async (req, res, next) => {
    try {
        res.send(await serviceCompanie.readAllCompanies())
    } catch (error) {
        next(error)
    }
}

// Exportação das funções
export default {
    createCompanieWithLoginWithAdress,
    getAllCompanies
}
