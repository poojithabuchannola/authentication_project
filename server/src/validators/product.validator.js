import { body, param } from "express-validator";

export const createProductValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isNumeric()
        .withMessage("Price must be a number"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
];

export const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty")
];

export const productIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID")
];