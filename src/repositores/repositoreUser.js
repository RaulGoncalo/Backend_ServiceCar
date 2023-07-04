import User from "../models/users.js";
import Login from "../models/login.js";

const insertUser = async (user, transaction) => {
    try {
        return await User.create(user, { transaction })
    } catch (error) {
        throw error
    }
}

const readUserByLoginId = async (id) => {
    try {
        const userFinded = await User.findOne({
            where: {
                loginId: id,
            },
            include: {
                model: Login,
                attributes: ['loginId', 'email'],
            },
            attributes: ['userId', 'name', 'phone'],
        })

        if (!userFinded) {
            return false
        }

        return userFinded

    } catch (error) {
        throw error
    }
}

const readUserById = async (id) => {
    try {
        const userFinded = await User.findByPk(id)

        if (!userFinded) {
            return false
        }

        return userFinded

    } catch (error) {
        throw error
    }
}

const updateUser = async (newUser) => {
    try {
        await User.update(newUser, {
            where: {
                userId: newUser.userId
            }
        });
        return await findUser(newUser.userId);
    } catch (error) {
        throw error;
    }
};

export default {
    insertUser,
    readUserByLoginId,
    readUserById,
    updateUser
}