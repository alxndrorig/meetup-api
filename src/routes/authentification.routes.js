import { Router } from "express";
import {
    registration,
    login,
    getAccessToken,
    loggingOut
} from "../controllers/authentification.controller.js";
import AuthValidator from "../middlewares/auth.validator.js";

const authValidator = new AuthValidator();

export const authentificationRouter = () => {
    const router = new Router();

    router.post("/login", authValidator.authentification, login);

    router.post("/register", authValidator.user, registration);

    router.post("/", authValidator.refreshToken, getAccessToken);

    router.delete("/", authValidator.refreshToken, loggingOut);

    return router;
};
