import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useGetSummaryDesactivated = () => {
    return useQuery({
        queryKey: ["get-summary-desactivated"],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/resumos/desativados`)
            if(!response.ok){
                throw new Error("Erro ao buscar resumo desativados!");
            }

            const responseBody = await response.text();
            const result: ResponseGetSummaryType[] = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo desativados!" }];

            const data = result.map((item) => ({
                 studentId: item.studentId,
                summaryId: item.summaryId,
                titulo: item.titulo,
                conteudo: item.conteudo,
                reports: item.reports ?? 0,
                ativo: item.ativo,
                studentUrl: item.studentUrl ?? "/avatares/default.svg",
                studentNome: item.studentNome,
                totalCurtidas: item.totalCurtidas ?? 0,
                subjectId: item.subjectId,
                subjectNome: item.subjectNome,
                publico: item.publico,
                tags: item.tags
            }))
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}