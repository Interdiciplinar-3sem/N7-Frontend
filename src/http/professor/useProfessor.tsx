import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { API_URL } from "../api";
import type { ProfessorProfileType } from "./types/ProfessorProfileType";
import type { ResponsePostUser } from "../user/types/ResponsePostUser";
import type { requestPendingProfessorCreate } from "./types/requestPendingProfessorCreate";
import { request } from "../httpClient";

export const useGetProfessorMe = (
    options?: Omit<
        UseQueryOptions<ProfessorProfileType>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: ["get-professor-me"],
        queryFn: () =>
            request<ProfessorProfileType>(
                `${API_URL}/professor/me`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
        ...options,
    });
};

export const useGetProfessorById = (
    id: number,
    options?: Omit<
        UseQueryOptions<ProfessorProfileType>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: ["get-professor", id],
        queryFn: () =>
            request<ProfessorProfileType>(
                `${API_URL}/professor/${id}`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
        ...options,
    });
};

export const useCreateProfessor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["post-professor"],

        mutationFn: async (
            data: requestPendingProfessorCreate
        ): Promise<ResponsePostUser> => {
            const message = await request<string>(
                `${API_URL}/adm/confirm/email/professor`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            return { message, id: 0 };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-users"],
            });
        },
    });
};

export const useAssignProfessorBadge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["assign-professor-badge"],

        mutationFn: async (
            summaryId: number
        ): Promise<{ message: string }> => {
            await request(
                `${API_URL}/resumos/${summaryId}/badge/professor`,
                {
                    method: "PATCH",
                }
            );

            return {
                message: "Selo atribuído com sucesso",
            };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
            await queryClient.invalidateQueries({ queryKey: ["get-feed"] });
        },
    });
};

export const useRemoveProfessorBadge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["remove-professor-badge"],

        mutationFn: async (
            summaryId: number
        ): Promise<{ message: string }> => {
            await request(
                `${API_URL}/resumos/${summaryId}/badge/professor`,
                {
                    method: "DELETE",
                }
            );

            return {
                message: "Selo removido com sucesso",
            };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
        },
    });
};