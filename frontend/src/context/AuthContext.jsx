import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async (userData) => {
        const response = await api.post(
            "/auth/register",
            userData
        );

        return response.data;
    };

    const login = async (userData) => {
        const response = await api.post(
            "/auth/login",
            userData
        );

        localStorage.setItem(
            "accessToken",
            response.data.accessToken
        );

        setUser(response.data.user);

        return response.data;
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.log(error);
        }

        localStorage.removeItem("accessToken");
        setUser(null);
    };

    const getMe = async () => {
        try {
            setLoading(true);

            const response = await api.get("/auth/me");

            setUser(response.data.user);
        } catch (error) {
            localStorage.removeItem("accessToken");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                getMe
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};