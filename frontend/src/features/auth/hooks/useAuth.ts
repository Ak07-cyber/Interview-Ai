import { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // Check if user is already authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/api/auth/get-me");
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = useCallback(async ({ email, password }: { email: string; password: string }) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/login", { email, password });
            setUser(response.data.User);
            return { success: true };
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Login failed. Please try again."
                : "Login failed. Please try again.";
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRegister = useCallback(async ({ username, email, password }: { username: string; email: string; password: string }) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/register", { username, email, password });
            setUser(response.data.User);
            return { success: true };
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Registration failed. Please try again."
                : "Registration failed. Please try again.";
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await api.get("/api/auth/logout");
        } catch {
            // Ignore logout errors
        } finally {
            setUser(null);
        }
    }, []);

    return { user, loading, handleLogin, handleRegister, handleLogout };
};
