import serviceUser from "../services/serviceUser.js";
import serviceCompanie from "../services/serviceCompanie.js";
import jwt from "jsonwebtoken";


export const KEY_TOKEN = "@#1425%1654*1$*(5534$@#@684844@$%#"

const validatedToken = async (req, res, next) => {
    try {
        //pega o token no Bearer no cabeçalho da requisição e guarda na variavél token
        let token = '';

        if (req.headers.authorization) {
            const authorizationHeader = req.headers.authorization;
            const headerParts = authorizationHeader.split(' ');

            if (headerParts.length === 2) {
                token = headerParts[1];
            }
        }

        if (!token) return res.status(401).send("É nescessario informar o token!")

        const payload = jwt.verify(token, KEY_TOKEN)
        let user

        if (req.baseUrl == "/user") {
            user = await serviceUser.readUserById(payload.user.userId)
        }

        if (req.baseUrl == "/companie") {
            user = await serviceCompanie.readCompanieById(payload.user.companieId)
        }

        if (!payload.user || !user) {
            return res.status(401).send("Token inválido, usuário não encontrado!")
        }

        req.user = payload.user;

        return next();
    } catch (error) {
        next(error)
    }
}

export default {
    validatedToken
}