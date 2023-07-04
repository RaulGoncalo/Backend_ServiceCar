import repositoreCompanie from "../repositores/repositoreCompanie.js";

const createCompanie = async (companie, transaction) => {
    return await repositoreCompanie.insertCompanie(companie, transaction)
}

const readCompanieByLoginId = async (id) => {
    return await repositoreCompanie.readCompanieByLoginId(id)
}

const readCompanieById = async (id) => {
    return await repositoreCompanie.readCompanieById(id)
}

const updateCompanie = async (newCompanie) => {
    return await repositoreCompanie.updateCompanie(newCompanie)
}

const readAllCompanies = async () => {
    return await repositoreCompanie.readAllCompanies()
}

// Exporta as funções do módulo
export default {
    createCompanie,
    readCompanieByLoginId,
    readCompanieById,
    updateCompanie,
    readAllCompanies
}