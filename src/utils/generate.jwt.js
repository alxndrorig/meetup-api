import jwt from "jsonwebtoken";

export const generateJWT = (id, role) => {
    const payload = {
        id,
        role
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
}