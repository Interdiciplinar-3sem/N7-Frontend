import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api"
import type { ResponseAuthType } from "./types/responseAuthType"
import type { ResponseLogutType } from "./types/ResponseLogutType"
import { useNavigate } from "react-router-dom"
import type { RequestLoginType } from "./types/requestLoginType"
import type { ResponseLoginType } from "./types/ResponseLoginType"
import { checkCookies } from "../../hooks/useCheckCookies"
import { request } from "../httpClient"
import { ApiError } from "../apiError"

const UNAUTHENTICATED_USER: ResponseAuthType = {
    status: false,
    id: null,
    studentId: null,
    professorId: null,
    role: null,
}

export const useAuth = () => {
    return useQuery<ResponseAuthType>({
        queryKey: ["user-auth"],
        queryFn: async () => {
            try {
                return await request<ResponseAuthType>(
                    `${API_URL}/auth`,
                    {
                        method: "GET",
                    }
                )
            } catch (error) {
                if (error instanceof ApiError) {
                    if (error.status === 401 || error.status === 403) {
                        return UNAUTHENTICATED_USER
                    }
                }

                throw error
            }
        },
        staleTime: 1000 * 60 * 3,
        refetchInterval: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["user-logout"],

        mutationFn: async () => {
            return request<ResponseLogutType>(
                `${API_URL}/auth/logout`,
                {
                    method: "POST",
                }
            );
        },

        onSuccess: async () => {
            localStorage.removeItem("accessToken");
            queryClient.clear();
            navigate("/login", { replace: true });
        },
    });
};

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["user-login"],
        mutationFn: async (
            data: RequestLoginType
        ) => {
            return request<ResponseLoginType>(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },
        onSuccess: async (data) => {
            const cookiesWork = checkCookies();

            if (!cookiesWork && data.token) {
                localStorage.setItem(
                    "accessToken",
                    data.token
                );
            }

            queryClient.setQueryData(
                ["user-auth"],
                { status: true }
            );

            navigate("/feed", {
                replace: true,
            });
        },
    });
};