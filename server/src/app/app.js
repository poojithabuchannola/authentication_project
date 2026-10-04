import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/products.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "Authentication & Product CRUD API is working"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

export default app;