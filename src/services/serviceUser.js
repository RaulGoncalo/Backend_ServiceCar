import repositoreUser from "../repositores/repositoreUser.js";

const createUser = async (user, transaction) => {
    return await repositoreUser.insertUser(user, transaction)
}

const readUserByLoginId = async (id) => {
    return await repositoreUser.readUserByLoginId(id)
}

const readUserById = async (id) => {
    return await repositoreUser.readUserById(id)
}

const updateUser = async (newUser) => {
    return await repositoreUser.updateUser(newUser)
}

// Exporta as funções do módulo
export default {
    createUser,
    readUserByLoginId,
    readUserById,
    updateUser
}