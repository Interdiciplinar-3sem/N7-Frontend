import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useGetFeed = (id: string) => {
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

            // suporta resposta paginada { data: [...] } ou array direta
            const list: any[] = Array.isArray(parsed) ? parsed : (parsed.data ?? []);

            const data: ResponseGetSummaryType[] = list.map((item) => ({
                studentId: String(item.studentId),
                summaryId: String(item.summaryId),
                titulo: item.titulo,
                conteudo: item.conteudo,
                reports: item.reports ?? 0,
                ativo: item.ativo,
                totalCurtidas: item.totalCurtidas ?? 0,
                studentUrl: item.studentUrl ?? "/avatares/default.svg",
                studentNome: item.studentNome ?? item.studentName,
                subjectId: item.subjectId ? String(item.subjectId) : (item.subject?.id ? String(item.subject.id) : undefined),
                subjectName: item.subjectName ?? item.subjectNome ?? item.subject?.name ?? item.materia ?? item.disciplina,
                materia: item.materia,
                disciplina: item.disciplina,
                subject: item.subject ?? (item.subjectId || item.subjectName ? { id: item.subjectId, name: item.subjectName ?? item.subjectNome } : undefined),
            }))

            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar feed"))
        }
    }, [query.error, query.isError, showError])

    return query
}