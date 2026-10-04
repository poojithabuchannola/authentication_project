import { Router } from "express";

import {
    register,
    login,
    refreshToken,
    logout,
    me
} from "../controller/auth.controller.js";

import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator.js";

import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.post(
    "/refresh-token",
    refreshToken
);

router.post(
    "/logout",
    authenticate,
    logout
);

router.get(
    "/me",
    authenticate,
    me
);

export default router;