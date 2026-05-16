import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useGetSummary = () => {
    return useQuery({
        queryKey: ["get-summary"],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/resumos/ativos`)
            if(!response.ok){
                throw new Error("Erro ao buscar resumo!");
            }

            const responseBody = await response.text();
            const result: ResponseGetSummaryType[] = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo!" }];

            const data = result.map((item) => ({
                studentId: item.studentId,
                summaryId: item.summaryId,
                titulo: item.titulo,
                conteudo: item.conteudo.slice(0, 100) + (item.conteudo.length > 100 ? "..." : ""),
                reports: item.reports ?? 0
            }))
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}