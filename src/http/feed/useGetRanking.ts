import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useGetRanking = (id: string) => {
    return useQuery({
        queryKey: ["get-ranking", id],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/ranking`)
            if(!response.ok){
                throw new Error("Erro ao buscar ranking!");
            }

            const responseBody = await response.text();
            const result: ResponseGetSummaryType[] = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar ranking!" }];

            const data = result.map((item) => ({
                studentId: item.studentId,
                summaryId: item.summaryId,
                titulo: item.titulo,
                conteudo: item.conteudo,
                reports: item.reports ?? 0,
                ativo: item.ativo,
                studentUrl: item.studentUrl,
                studentNome: item.studentNome,
                totalCurtidas: item.totalCurtidas ?? 0
            }))
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}