import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }

            return true;
        })
];

export const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .isString()
        .notEmpty()
        .withMessage("Password is required")
];