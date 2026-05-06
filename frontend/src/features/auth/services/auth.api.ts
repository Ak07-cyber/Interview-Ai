//implementing the just the function call which is responsible for making the call and function will be invoked in the hook layer (custom hook actions)

import api from "../../../api.client";
import { type auth } from "../types/auth.types";


export async function register({username,email,password}:auth){
    try{
        const response=await api.post("/api/auth/register",{
            username,
            email,
            password
        })

        return response.data;
    }catch(error:any){
        const message = error?.response?.data?.message || "Registration failed. Please try again.";
        throw new Error(message);
    }
}

export async function login({email,password}:auth){
    try{
        const response=await api.post("/api/auth/login",{
            email,
            password
        })

        return response.data;
    }catch(error:any){
        const message = error?.response?.data?.message || "Login failed. Please try again.";
        throw new Error(message);
    }
}

export async function logout() {
    try{
        const response=await api.get("/api/auth/logout");

        return response.data;
    }catch(error:any){
        const message = error?.response?.data?.message || "Logout failed.";
        throw new Error(message);
    }
}

export async function getMe() {
    try{
        const response=await api.get("/api/auth/get-me");

        return response.data;
    }catch(error){
        throw error; // Let the caller handle this
    }
}