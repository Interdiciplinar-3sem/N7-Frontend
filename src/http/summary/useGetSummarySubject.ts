import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetSummaryType } from "../types/responseGetSummary";

export const useGetSummarySubjectId = (
    subjectId: string,
) => {
    return useQuery({
        queryKey: ["get-summaries-subject", subjectId],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/resumos/subject/${subjectId}`)
            if(!response.ok){
                throw new Error("Erro ao buscar resumo!");
            }

            const responseBody = await response.text();
            const result: ResponseGetSummaryType[] = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo!" }];

            return result;
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!subjectId,
    })
}