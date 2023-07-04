import Sequelize from "sequelize"
import db from "../database/config.js"
import Login from "./login.js"
import Addrees from "./address.js"

const Companie = db.define('companies', {
    companieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    specialty: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { underscored: true })

Companie.belongsTo(Login, { foreignKey: "loginId" });
Companie.belongsTo(Addrees, { foreignKey: "addressId" });

export default Companie