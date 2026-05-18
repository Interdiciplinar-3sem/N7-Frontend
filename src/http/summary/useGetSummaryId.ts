import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useGetSummaryId = (id: string) => {
    return useQuery({
        queryKey: ["get-summary", id],
        queryFn: async (): Promise<ResponseGetSummaryType> => {
            const response = await authFecth(`${API_URL}/resumos/${id}`)
            if(!response.ok){
                throw new Error("Erro ao buscar resumo!");
            }

            const responseBody = await response.text();
            const result: ResponseGetSummaryType = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo!" }];

            return result;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}