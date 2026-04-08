import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
//creating the sample pages of the login and the register

export const router=createBrowserRouter([
    {
        path: "/interview",
        element: <Interview/>
    },
    {
        path: "/",
        element: <Home/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])