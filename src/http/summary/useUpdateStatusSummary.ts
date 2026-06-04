import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateStatusSummary = () => {
    const queryClient = useQueryClient();

    const invalidateSummaryQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-subject"] });

        await queryClient.refetchQueries({ queryKey: ["get-summary"], type: "active" });
        await queryClient.refetchQueries({ queryKey: ["get-summary-desactivated"], type: "active" });
        await queryClient.refetchQueries({ queryKey: ["get-summaries-me"], type: "active" });
        await queryClient.refetchQueries({ queryKey: ["get-summaries-student"], type: "active" });
        await queryClient.refetchQueries({ queryKey: ["get-summaries-subject"], type: "active" });
    }

    return useMutation({
        mutationKey: ["put-status-summary"],
        mutationFn: async (id: number): Promise<{ message: string }> => {
            const response = await authFecth(`${API_URL}/resumos/atualizar_status/${id}`, {
                method: "PATCH",
            })

            if(!response.ok){
                throw new Error("Erro ao atualizar resumo!"); 
            }

            const responseBody = await response.text();

            if (!responseBody.trim()) {
                return { message: "Sucesso ao atualizar status do resumo!" };
            }

            try {
                return JSON.parse(responseBody);
            } catch {
                return { message: responseBody };
            }
        },
        onSuccess: invalidateSummaryQueries
    })
}