import { useMutation } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { RequestCreateSummaryType } from "../types/requestCreateSummaryType"
import type { ResponseCreateSummaryType } from "../types/responseCreateSummaryType"

export const useSummaryPost = () => {

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
    })
}