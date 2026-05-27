import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestUpdateSummaryType } from "../types/requestUpdateSummaryType"
import type { ResponseUpdateSummaryType } from "../types/responseUpdateSummaryType"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateSummary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["put-summary"],
        mutationFn: async (data: RequestUpdateSummaryType): Promise<ResponseUpdateSummaryType> => {
            const response = await authFecth(`${API_URL}/resumos`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error("Erro ao atualizar resumo!"); //precisa cobrir mais excessões posteriormente
            }

            const responseBody = await response.text();
            const result: ResponseUpdateSummaryType = responseBody.trim()
                ? JSON.parse(responseBody) : { message: "Sucesso ao atualizar resumo!"};
            return result;
        },
        onSuccess: async () => {
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
    })
}