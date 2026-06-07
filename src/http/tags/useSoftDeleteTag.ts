// src/http/tag/useUpdateTagStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext";

export const useSoftDeleteTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await authFecth(`${API_URL}/tags/atualizar_status/${id}`, {
                method: "PATCH",
            });

            if (!response.ok) {
                throw new Error("Não foi possível alterar o status da tag");
            }

            return await response.text();
        },
        onSuccess: (data) => {
            showSuccess(data || "Status da tag atualizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["get-all-tags"] });
            queryClient.invalidateQueries({ queryKey: ["get-tags-desactivated"] });
        },
        onError: () => {
            showError("Erro ao atualizar o status da tag");
        }
    });
};