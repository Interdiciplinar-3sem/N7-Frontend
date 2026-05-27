import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseCreateSummaryType } from "../types/ResponseGetCourseStudentsType";

export const useGetCourseStudentsSemester = (
    courseId: string,
    semestre: number,
) => {
    return useQuery({
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
    })
}