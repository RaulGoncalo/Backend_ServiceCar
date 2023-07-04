import Address from "../models/address.js";

const insertAddress = async (address, transaction) => {
    try {
        const createdAddress = await Address.create(address, { transaction });
        return createdAddress.addressId;
    } catch (error) {
        throw error;
    }
};


const findAddress = async (id) => {
    try {
        let addressFinded = await Address.findByPk(id)

        if (!addressFinded) {
            return addressFinded
        }

        return addressFinded.dataValues

    } catch (error) {
        throw error
    }
}

const updateAddress = async (newAddress) => {
    try {
        await Address.update(newAddress, {
            where: {
                addressId: newAddress.addressId
            }
        });
        return await findAddress(newAddress.addressId);
    } catch (error) {
        throw error;
    }
};


export default {
    insertAddress,
    findAddress,
    updateAddress
}