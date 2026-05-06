import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router";
import type { ReactNode } from "react";
import LoadingSpinner from "../LoadingSpinner";

/**
 * Route guard that redirects unauthenticated users to /login.
 * Shows a loading spinner while the auth check is in progress.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
