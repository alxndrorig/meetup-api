import jwt from "jsonwebtoken";
import { dbConnection } from "../config/connection.js";
import JwtTokensDto from "../dto/jwt.tokens.dto.js";
import UserToken from "../models/user.token.model.js";

export const generateJWT = async (id, role) => {
    try {
        const payload = {
            id,
            role
        }
    
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '30d' });
        const userToken = await dbConnection.oneOrNone('SELECT * FROM usertokens WHERE "userId" = $1', [id]);
        if (userToken) {
            await dbConnection.result('DELETE FROM usertokens WHERE id = $1', [userToken.id]);
        }
        
        const newUserToken = new UserToken({
            userId: id, 
            token: refreshToken, 
            createdAt: new Date()
        });

        dbConnection.one('INSERT INTO usertokens("userId", token, "createdAt") VALUES($1, $2, $3) RETURNING *', [newUserToken.userId, newUserToken.token, newUserToken.createdAt])
        return new JwtTokensDto(accessToken, refreshToken);
    } catch (error) {
        throw error;
    }
}

export default generateJWT;
