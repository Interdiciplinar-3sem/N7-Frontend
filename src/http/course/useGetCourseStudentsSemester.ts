import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseCreateSummaryType } from "../types/ResponseGetCourseStudentsType";
import { useToast } from "../../contexto/toastContext";

export const useGetCourseStudentsSemester = (
    courseId: number,
    semestre: number,
) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["courseStudents", courseId, semestre],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/courses/${courseId}/semestres/${semestre}/students`);

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
            showError("Erro ao carregar alunos")
        }
    }, [query.error, query.isError])

    return query
}