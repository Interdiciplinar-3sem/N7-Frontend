// src/http/tags/useCreateTag.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext";

export const useCreateTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async (nome: string) => {
            const response = await authFecth(`${API_URL}/tags`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: nome, ativo: true }),
            });
            if (!response.ok) throw new Error("Erro ao criar nova tag");
            return response.json();
        },
        onSuccess: () => {
            showSuccess("Tag criada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
        onError: () => showError("Erro ao criar nova tag"),
    });
};