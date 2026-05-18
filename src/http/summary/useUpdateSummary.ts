import { useMutation } from "@tanstack/react-query"
import type { RequestUpdateSummaryType } from "../types/requestUpdateSummaryType"
import type { ResponseUpdateSummaryType } from "../types/responseUpdateSummaryType"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateSummary = () => {
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
        }
    })
}