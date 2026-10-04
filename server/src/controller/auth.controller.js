import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/auth.utils.js";

import config from "../config/config.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email address"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;

        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",

            accessToken,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token is required"
            });
        }

        const decoded = jwt.verify(
            token,
            config.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== token) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};

export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Me error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};