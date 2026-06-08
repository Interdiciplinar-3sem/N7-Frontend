import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { API_URL } from "../api";
import { request } from "../httpClient";
import { useToast } from "../../contexto/toastContext";

import type { RequestSignUpType } from "./types/RequestSignUpType";
import type { ResponsePostUser } from "../user/types/ResponsePostUser";
import type { ResponseGetStudentType } from "./types/ResponseGetStudentType";
import type { RequestUpdateStudentType } from "./types/RequestUpdateStudentType";
import type { ResponseUpdateStudentType } from "./types/ResponseUpdateStudentType";

export const useUpdateActiveStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-active-user"],

        mutationFn: async (userId: number) => {
            await request(
                `${API_URL}/user/atualizar_status/${userId}`,
                {
                    method: "PATCH",
                }
            );

            return {
                message: "Usuario atualizado com sucesso",
            };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
            await queryClient.invalidateQueries({ queryKey: ["get-users-desactivated"] });
        },
    });
};

export const useGetStudent = (
    id: number,
    options?: Omit<
        UseQueryOptions<ResponseGetStudentType>,
        "queryKey" | "queryFn"
    >
) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-student", id],

        queryFn: () =>
            request<ResponseGetStudentType>(
                `${API_URL}/student/${id}`
            ),

        retry: false,
        staleTime: 1000 * 60 * 5,
        ...options,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar perfil");
        }
    }, [query.isError]);

    return query;
};

export const useGetStudentMe = (
    id: number,
    options?: Omit<
        UseQueryOptions<ResponseGetStudentType>,
        "queryKey" | "queryFn"
    >
) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-student-me", id],

        queryFn: () =>
            request<ResponseGetStudentType>(
                `${API_URL}/student/me`
            ),

        retry: false,
        refetchOnWindowFocus: true,
        ...options,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar seu perfil");
        }
    }, [query.isError]);

    return query;
};

export const useUpdateStudent = (id: number) => {
    const queryClient = useQueryClient();
    const { showError, showSuccess } = useToast();

    return useMutation({
        mutationKey: ["update-student", id],

        mutationFn: (data: RequestUpdateStudentType) =>
            request<ResponseUpdateStudentType>(
                `${API_URL}/student/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                }
            ),

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
            await queryClient.invalidateQueries({ queryKey: ["get-users-desactivated"] });
            await queryClient.invalidateQueries({ queryKey: ["get-student", id] });
            await queryClient.invalidateQueries({ queryKey: ["get-student-me", id] });
            await queryClient.invalidateQueries({ queryKey: ["get-feed", id] });
            await queryClient.invalidateQueries({ queryKey: ["get-ranking", id] });

            showSuccess("Perfil atualizado com sucesso");
        },

        onError: () => {
            showError("Erro ao atualizar perfil");
        },
    });
};

export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["post-user"],

        mutationFn: async (
            data: RequestSignUpType
        ): Promise<ResponsePostUser> => {
            return request<ResponsePostUser>(
                `${API_URL}/user`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-users"],
            });
        },
    });
};