import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../http/auth/useAuth";
import { FeedSkeleton } from "../componentes/FeedSkeleton";

export function ProtectedRoute() {
    const { isLoading, isError, data } = useAuth();

    if (isLoading) {
        return <FeedSkeleton />;
    }

    if (isError || data?.status !== true) {
        return <Navigate to="/login" replace/>;
    }
    console.log("teste:", data.id)

    return (
        <Suspense fallback={<FeedSkeleton />}>
            <Outlet context={{id: data.id}}/>
        </Suspense>
    )
}