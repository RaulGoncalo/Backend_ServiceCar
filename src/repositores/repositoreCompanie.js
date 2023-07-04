import Companie from "../models/companie.js"
import Login from "../models/login.js";
import Address from "../models/address.js"

const insertCompanie = async (companie, transaction) => {
    try {
        return await Companie.create(companie, { transaction })
    } catch (error) {
        throw error
    }
}

const readCompanieByLoginId = async (id) => {
    try {
        const companieFinded = await Companie.findOne({
            where: {
                loginId: id,
            },
            include: [
                {
                    model: Login,
                    attributes: ['loginId', 'email'],
                },
                {
                    model: Address
                }
            ],
            attributes: ['companieId', 'name', 'cnpj', 'specialty', 'phone'],
        })

        if (!companieFinded) {
            return false
        }

        return companieFinded

    } catch (error) {
        throw error
    }
}

const readCompanieById = async (id) => {
    try {
        const companieFinded = await Companie.findByPk(id)

        if (!companieFinded) {
            return false
        }

        return companieFinded

    } catch (error) {
        throw error
    }
}

const readAllCompanies = async () => {
    try {
        const allcompanies = await Companie.findAll({
            include: [
                { model: Address },
                { model: Login, attributes: ['loginId', 'email'] }
            ],
            attributes: ['companieId', 'name', 'cnpj', 'specialty', 'phone']
        })

        return allcompanies
    } catch (error) {
        throw error
    }
}

const updateCompanie = async (newCompanie) => {

    try {
        await Companie.update(newCompanie, {
            where: {
                companieId: newCompanie.companieId
            }
        });
        return await readCompanieById(newCompanie.companieId);
    } catch (error) {
        throw error;
    }
};

export default {
    insertCompanie,
    readCompanieByLoginId,
    readCompanieById,
    updateCompanie,
    readAllCompanies
}