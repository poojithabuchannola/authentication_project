import { Router } from "express";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controller/product.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import upload from "../middlewares/upload.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
    createProductValidator,
    updateProductValidator,
    productIdValidator
} from "../validators/product.validator.js";

const router = Router();

router.post(
    "/",
    authenticate,
    upload.single("image"),
    createProductValidator,
    validate,
    createProduct
);

router.get(
    "/",
    getProducts
);

router.get(
    "/:id",
    productIdValidator,
    validate,
    getProductById
);

router.put(
    "/:id",
    authenticate,
    upload.single("image"),
    productIdValidator,
    updateProductValidator,
    validate,
    updateProduct
);

router.delete(
    "/:id",
    authenticate,
    productIdValidator,
    validate,
    deleteProduct
);

export default router;