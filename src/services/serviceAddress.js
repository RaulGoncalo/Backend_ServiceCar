import repositoreAddress from "../repositores/repositoreAddress.js"


const createAddress = async (address, transaction) => {
    return await repositoreAddress.insertAddress(address, transaction)
}

const findAddress = async (id) => {
    return await repositoreAddress.findAddress(id)
}

const updateAddress = async (newAddress) => {
    return await repositoreAddress.updateAddress(newAddress)
}

export default {
    createAddress,
    findAddress,
    updateAddress
}