import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import Reports from "./features/interview/pages/Reports";
import NotFound from "./features/NotFound";
import ProtectedRoute from "./features/auth/ProtectedRoute";

export const router=createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path: "/interview/:interviewId",
        element: <ProtectedRoute><Interview/></ProtectedRoute>
    },
    {
        path: "/interview",
        element: <ProtectedRoute><Interview/></ProtectedRoute>
    },
    {
        path: "/reports",
        element: <ProtectedRoute><Reports/></ProtectedRoute>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
])