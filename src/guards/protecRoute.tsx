import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../http/auth/useAuth";
import { FeedSkeleton } from "../componentes/Skeleton/FeedSkeleton";

export function ProtectedRoute() {
    const { isLoading, isError, data } = useAuth();

    if (isLoading) {
        return <FeedSkeleton />;
    }

    if (isError || data?.status !== true) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <Suspense fallback={<FeedSkeleton />}>
            <Outlet context={{
                id: data.id ?? 0,
                studentId: data.studentId ?? 0,
                professorId: data.professorId ?? 0,
                role: data.role ?? "",
            }}/>
        </Suspense>
    )
}