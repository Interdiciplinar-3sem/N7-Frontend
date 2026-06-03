import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseCreateSummaryType } from "../types/ResponseGetCourseStudentsType";
import { useToast } from "../../contexto/toastContext";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useGetCourseStudents = (
    courseId: string,
) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["courseStudents", courseId],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/courses/${courseId}/students`);

            if (!response.ok) {
                const body = await response.text().catch(() => "");
                throw new Error(`Erro ao buscar alunos do curso (${response.status}): ${body}`);
            }

            const responseBody = await response.text();
            const result: ResponseCreateSummaryType[] = responseBody.trim()
                ? JSON.parse(responseBody)
                : [];

            return result;
        },
        staleTime: 1000 * 60  * 15,
        retry: 2
    })

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar alunos"))
        }
    }, [query.error, query.isError, showError])

    return query
}