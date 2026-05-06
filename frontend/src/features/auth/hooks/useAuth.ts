/**this custom hook file handles all the business logic such as calling the api function and storing the data of the api response in the global store
 * showing the loading screen until the api response
 * the useEffect runs once when the component using this hook mounts checking if the user is already logged in
 * action dispatching (providing the handlers) 
 * this file might not be required but for easy debugging and clean code practice we do this and setting up the context across the entire application 
 * we can directly import the api function in the ui pages
*/

import { useContext,useEffect } from "react";
import { AuthContext, type AuthContextType } from "../auth.context";
import { login,register,getMe,logout } from "../services/auth.api";
import { type auth } from "../types/auth.types";

export const useAuth=()=>{ //custom hook

    const context=useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const {user,setUser,loading,setLoading} = context as AuthContextType;

    //handling of the entire logic of the login page(handler)
    const handleLogin=async({email,password}:auth): Promise<{ success: boolean; error?: string }>=>{
        setLoading(true);
        try{
            const data=await login({email,password});
            setUser(data.User)
            return { success: true };
        }catch(error:any){
            return { success: false, error: error.message || "Login failed" };
        }finally{
            setLoading(false); //this ensures that the user doesnt keep seeing the loading screen when the api calls fails
        }
    }

    const handleRegister=async({username,email,password}:auth): Promise<{ success: boolean; error?: string }>=>{
        setLoading(true);
        try{
            const data=await register({username,email,password});
            setUser(data.User)
            return { success: true };
        }catch(error:any){
            return { success: false, error: error.message || "Registration failed" };
        }finally{
            setLoading(false); //this ensures that the user doesnt keep seeing the loading screen when the api calls fails
        }
    }

    const handleLogout=async()=>{
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }catch(error){
            console.error("Logout failed:", error);
        }finally{
            setLoading(false); //this ensures that the user doesnt keep seeing the loading screen when the api calls fails
        }
    }

    useEffect(()=>{
        const getandSetUser=async()=>{
            try{
                const data=await getMe();
                setUser(data.user)
            }catch(error){
                // User is not logged in — this is expected on public pages
                setUser(null);
            }finally{(setLoading(false))}
        }

        getandSetUser();
    },[])

    return {user,loading,handleLogin,handleRegister,handleLogout}
}