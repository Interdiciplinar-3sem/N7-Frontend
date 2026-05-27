import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { useToast } from "../../contexto/toastContext";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useGetSummarySubjectId = (
    subjectId: string,
) => {
    const { showError } = useToast()

    const query = useQuery({
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

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar resumos da matéria"))
        }
    }, [query.error, query.isError, showError])

    return query
}