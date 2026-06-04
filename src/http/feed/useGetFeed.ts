import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useGetFeed = (id: number) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["get-feed", id],
        queryFn: async (): Promise<ResponseGetSummaryType[]> => {
            const response = await authFecth(`${API_URL}/feed/me?limit=20`)
            if(!response.ok){
                throw new Error("Erro ao buscar feed!");
            }

            const responseBody = await response.text();
            const parsed: any = responseBody.trim() ? JSON.parse(responseBody) : { data: [] };

            const list: any[] = Array.isArray(parsed) ? parsed : (parsed.data ?? []);

            const data: ResponseGetSummaryType[] = list.map((item) => ({
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
        retry: false,
        enabled: !!id
    })

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar feed"))
        }
    }, [query.error, query.isError, showError])

    return query
}