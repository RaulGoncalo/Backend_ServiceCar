import Sequelize from "sequelize"
import db from "../database/config.js"

const Login = db.define('logins', {
    loginId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { underscored: true });

export default Login
