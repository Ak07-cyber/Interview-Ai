import axios from "axios";

/**
 * Shared Axios instance for all API calls.
 * Uses VITE_API_URL environment variable or falls back to localhost.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
});

export default api;
