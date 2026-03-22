//implementing the just the fucntion call which is responsible for making the call and function will be invoked in the hook layer (custom hook actions)

import axios from "axios";
import { type auth } from "../types/auth.types";

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function register({username,email,password}:auth){
    try{
        const response=await api.post("api/auth/register",{
            username,
            email,
            password
        })

        return response.data;
    }catch(error){
        console.log("error Occured during Register :",error);
    }
}

export async function login({email,password}:auth){
    try{
        const response=await api.post("api/auth/login",{
            email,
            password
        })

        return response.data;
    }catch(error){
        console.log("error  Occured during the Login")
    }
}

export async function logout() {
    try{
        const response=await api.get("/api/auth/logout");

        return response.data;
    }catch(error){
        console.log("error Occured while logging out :",error)
    }
}

export async function getMe() {
    try{
        const response=await api.get("/api/auth/get-me");

        return response.data;
    }catch(error){

    }
}