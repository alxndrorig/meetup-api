import { authentificationValidation } from "../validations/authentification.validation.js";
import { userValidation } from "../validations/user.validation.js";
import { refreshTokenValidation } from "../validations/refreshtoken.validation.js"

class AuthValidator {
    authentification(req, res, next) {
        const { error } = authentificationValidation(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }

    user(req, res, next) {
        const { error } = userValidation(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }
    
    refreshToken(req, res, next) {
        const { error } = refreshTokenValidation(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }
}

export default AuthValidator;
