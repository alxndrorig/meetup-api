import { Router } from "express";
import RequestValidator from "../middlewares/request.validator.js";
import { registration, login} from "../controllers/authentification.controller.js";

const requestValidator = new RequestValidator();

export const authentificationRouter = () => {
    const router = new Router();

    router.post(
            '/login',
            requestValidator.authentification,
            login
            );

    router.post(
            '/register',
            requestValidator.user,
            registration
            );

    return router;
}