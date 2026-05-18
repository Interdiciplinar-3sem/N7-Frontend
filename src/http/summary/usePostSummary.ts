import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { RequestCreateSummaryType } from "../types/requestCreateSummaryType"
import type { ResponseCreateSummaryType } from "../types/responseCreateSummaryType"

export const useSummaryPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["post-summary"],
        mutationFn: async (data: RequestCreateSummaryType): Promise<ResponseCreateSummaryType> => {
            const response = await authFecth(`${API_URL}/resumos`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            
            if(response.status === 409) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 409,
                    message: errorBody.message
                }))
            }

            if(!response.ok){ throw new Error(`Erro ao criar resumo! Status: ${response.status}`) }

            const responseBody = await response.text()
            const result: ResponseCreateSummaryType = responseBody.trim()
                ? JSON.parse(responseBody)
                : { message: "Resumo criado com sucesso", id: "" }

            return result;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
            await queryClient.refetchQueries({ queryKey: ["get-summary"], type: "active" });
            await queryClient.refetchQueries({ queryKey: ["get-summary-desactivated"], type: "active" });
        }
    })
}