import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetCourseSubjectsType } from "../types/responseGetCourseSubjects";

export const useGetCourseSubjectsSemester = (
    courseId: string,
    semestre: string,
    options?: Omit<UseQueryOptions<ResponseGetCourseSubjectsType[]>, "queryKey" | "queryFn">    
) => {
    return useQuery({
        queryKey: ["courseSubjects", courseId, semestre],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/courses/${courseId}/semestres/${semestre}/subjects`);

            if (!response.ok) {
                const body = await response.text().catch(() => "");
                throw new Error(`Erro ao buscar matérias do curso (${response.status}): ${body}`);
            }

            const responseBody = await response.text();
            const result: ResponseGetCourseSubjectsType[] = responseBody.trim()
                ? JSON.parse(responseBody)
                : [];

            return result;
        },
        ...options
    })
}