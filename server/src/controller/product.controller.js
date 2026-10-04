import Product from "../models/product.model.js";
import { uploadImage } from "../../services/imagekit.service.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            category
        } = req.body;

        let imageUrl = null;

        if (req.file) {
            const image = await uploadImage(req.file);
            imageUrl = image.url;
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image: imageUrl,
            createdBy: req.user.userId
        });

        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            products
        });
    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            product
        });
    } catch (error) {
        console.error("Get product error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const {
            name,
            description,
            price,
            stock,
            category
        } = req.body;

        if (name !== undefined) {
            product.name = name;
        }

        if (description !== undefined) {
            product.description = description;
        }

        if (price !== undefined) {
            product.price = price;
        }

        if (stock !== undefined) {
            product.stock = stock;
        }

        if (category !== undefined) {
            product.category = category;
        }

        if (req.file) {
            const image = await uploadImage(req.file);
            product.image = image.url;
        }

        await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("Update product error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Delete product error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};