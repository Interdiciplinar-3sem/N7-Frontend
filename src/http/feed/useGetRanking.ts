import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext"

export const useGetRanking = (id: number) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["get-ranking", id],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/resumos/ranking?limit=20`)
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

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar ranking")
        }
    }, [query.error, query.isError])

    return query
}