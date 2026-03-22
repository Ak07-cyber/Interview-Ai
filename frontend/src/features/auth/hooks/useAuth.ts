/**this custom hook file handles all the business logic such as calling the api function and storing the data of the api response in the global store
 * showing the loading screen until the api response
 * the useEffect runs once when the component usng this hook mounts checking if the use is already logged in
 * action dispatching (providing the handlers) 
 * this file might not be required by for easy debugging and clean code pratice we do this and setting up the context across the entire application 
 * we can directly import he api fucntion in the ui pages
*/

import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login,register,getMe,logout } from "../services/auth.api";
import { type auth } from "../types/auth.types";

export const useAuth=()=>{ //custom hook

    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context;

    //handling of the entire logic of the login page(handler)
    const handleLogin=async({email,password}:auth)=>{
        setLoading(true);
        try{
            const data=await login({email,password});
            setUser(data.User)
        }catch(error){

        }finally{
            setLoading(false); //this ensures that the user doesnt keep seeing the loading screen when the api calls fails
        }
    }

    const handleRegister=async({username,email,password}:auth)=>{
        setLoading(true);
        try{
            const data=await register({username,email,password});
            setUser(data.User)
        }catch(error){

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

        }finally{
            setLoading(false); //this ensures that the user doesnt keep seeing the loading screen when the api calls fails
        }
    }

    useEffect(()=>{
        const getandSetUser=async()=>{
            try{
                const data=await getMe();
                setUser(data.User)
            }catch(error){
                console.log("error in fetching user data")
            }finally{(setLoading(false))}
        }

        getandSetUser();
    },[])

    return {user,loading,handleLogin,handleRegister,handleLogout}
}