// src/http/tags/useUpdateTag.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext";

export const useUpdateTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async ({ id, name }: { id: number; name: string }) => {
            const response = await authFecth(`${API_URL}/tags/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error("Erro ao atualizar o nome da tag");
            return response.json();
        },
        onSuccess: () => {
            showSuccess("Tag atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            queryClient.invalidateQueries({ queryKey: ["get-tags-desactivated"] });
            queryClient.invalidateQueries({ queryKey: ["get-tag-by-id"] });
        },
        onError: () => showError("Erro ao atualizar o nome da tag"),
    });
};