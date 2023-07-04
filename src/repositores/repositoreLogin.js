import Login from "../models/login.js";

const insertLogin = async (login, transaction) => {
    try {
        const createdLogin = await Login.create(login, { transaction });
        return createdLogin.loginId;
    } catch (error) {
        throw error
    }
}

const findByEmail = async (email) => {
    try {
        let userFinded = await Login.findOne({
            where: {
                email: email
            },
        })

        if (!userFinded) {
            return userFinded
        }

        return userFinded.dataValues

    } catch (error) {
        throw error
    }
}

const updateLogin = async (newLogin) => {
    try {
        await Login.update(newLogin, {
            where: {
                loginId: newLogin.loginId
            }
        });
        return await findLogin(newLogin.loginId);
    } catch (error) {
        throw error;
    }
};

export default {
    insertLogin,
    findByEmail,
    updateLogin
}