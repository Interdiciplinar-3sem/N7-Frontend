import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api";
import { request } from "../httpClient";
import type { ResponseGetSubjectType } from "./types/ResponseGetSubjectType";

export const useGetAllSubjects = () => {
    return useQuery({
        queryKey: ["get-all-subjects"],
        queryFn: () =>
            request<ResponseGetSubjectType[]>(
                `${API_URL}/subjects/ativos`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetSubjectsDesactivated = () => {
    return useQuery({
        queryKey: ["get-subjects-desactivated"],
        queryFn: () =>
            request<ResponseGetSubjectType[]>(
                `${API_URL}/subjects/desativados`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useUpdateSubjectStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["put-status-subject"],
        mutationFn: (subjectId: number) =>
            request<{ message: string }>(
                `${API_URL}/subjects/atualizar_status/${subjectId}`,
                {
                    method: "PATCH",
                }
            ),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-all-subjects"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["get-subjects-desactivated"],
            });
        },
    });
};