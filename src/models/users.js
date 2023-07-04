import Sequelize from "sequelize"
import db from "../database/config.js"
import Login from "./login.js"

const User = db.define('users', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { underscored: true })

User.belongsTo(Login, { foreignKey: "loginId" }); // Define o relacionamento entre User e Login

export default User