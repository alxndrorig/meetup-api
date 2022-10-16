import {createUser, generateJWT} from "../services/authentification.services.js";
import passport from "passport";
import { generateJWT } from "../utils/generate.jwt.js";

const registration = async (req, res, next) => {
    const user = await createUser(req.body);
    if (user) {
        const token = generateJWT(user.id, user.role);
        res.status(201).json({token: token})
    } else {
        res.status(409).json({message: `user with email = ${req.body.email} has already exist`});
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', {failureRedirect: '/login'}, (error, user) => {
        if (error) {
            return res.status(404).json(error);
        }
        if (!user) {
            return res.status(401).json({message: 'Email or password is not valid'});
        }
        return res.status(200).json({token: generateJWT(user.id, user.role)})
    })(req, res, next)
}

export {registration, login};