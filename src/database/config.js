//import db from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    "postgres://rpvcqbru:l__Vk2BgQzBJfn1uX6URcmHZGcM4hJK4@silly.db.elephantsql.com/rpvcqbru",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize 