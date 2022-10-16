import jwt from "jsonwebtoken";
import { dbConnection } from "../config/connection.js";

const verifyRefreshToken = async (refreshToken) => {
	const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const token = await dbConnection.oneOrNone('SELECT * FROM usertokens WHERE token = $1', [refreshToken]);
	if (!token) {
        throw { message: "Invalid refresh token" };
    }
    return jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err)
            throw { message: "Invalid refresh token" };
        return ({
            tokenDetails,   
            message: "Valid refresh token",
        });
    });
}

export default verifyRefreshToken;