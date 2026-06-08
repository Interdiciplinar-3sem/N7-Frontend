import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../api";
import { request } from "../../httpClient";
import { useToast } from "../../../contexto/toastContext";

export const useSoftDeleteTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async (id: number) => {
            return request<{ message?: string }>(
                `${API_URL}/tags/atualizar_status/${id}`,
                {
                    method: "PATCH",
                }
            );
        },

        onSuccess: async (data) => {
            showSuccess(
                data?.message ?? "Status da tag atualizado com sucesso!"
            );

            await queryClient.invalidateQueries({
                queryKey: ["tags"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["get-tags-desactivated"],
            });
        },

        onError: () => {
            showError("Erro ao atualizar o status da tag");
        },
    });
};

export const useUpdateTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async ({
            id,
            name,
        }: {
            id: number;
            name: string;
        }) => {
            return request(
                `${API_URL}/tags/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ name }),
                }
            );
        },

        onSuccess: async () => {
            showSuccess("Tag atualizada com sucesso!");

            await queryClient.invalidateQueries({
                queryKey: ["tags"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["get-tags-desactivated"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["get-tag-by-id"],
            });
        },

        onError: () => {
            showError("Erro ao atualizar o nome da tag");
        },
    });
};