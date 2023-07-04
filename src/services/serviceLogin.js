import repositoreLogin from "../repositores/repositoreLogin.js"; // Importação do repositório de login
import validateEmail from "../functions/validations.js"; // Importação da função de validação de e-mail

// Função para criar um login
const createLogin = async (login, transaction) => {
    // Verifica se o e-mail já está cadastrado
    const user = await findByEmail(login.email);

    if (user) {
        throw new Error("E-mail já cadastrado.");
    }

    // Insere o login no repositório
    return await repositoreLogin.insertLogin(login, transaction);
};

const findByEmail = async (email) => {
    // Valida o formato do e-mail
    if (!validateEmail(email)) {
        throw new Error("O e-mail deve ser válido.");
    }

    // Busca o login no repositório
    return await repositoreLogin.findByEmail(email);
};

const updateLogin = async (newLogin) => {
    return await repositoreLogin.updateLogin(newLogin);
};

// Exporta as funções do módulo
export default {
    createLogin,
    findByEmail,
    updateLogin
};
