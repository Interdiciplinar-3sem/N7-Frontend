import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../api";
import { request } from "../../httpClient";
import { useToast } from "../../../contexto/toastContext";

export const useCreateTag = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: async (nome: string) => {
            return request(
                `${API_URL}/tags`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: nome,
                        ativo: true,
                    }),
                }
            );
        },

        onSuccess: async () => {
            showSuccess("Tag criada com sucesso!");
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
        },

        onError: () => {
            showError("Erro ao criar nova tag");
        },
    });
};