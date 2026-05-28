import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetCourseType } from "../types/responseGetCourse"

export const useGetCourses = () => {
    return useQuery({
        queryKey: ["get-courses"],
        queryFn: async (): Promise<ResponseGetCourseType[]> => {
            try {
                const response = await authFecth(`${API_URL}/courses`)

                if (!response.ok) {
                    const body = await response.text().catch(() => "");
                    throw new Error(`Erro ao buscar os cursos (${response.status}): ${body}`);
                }
    
                const responseBody = await response.text();
                const result: ResponseGetCourseType[] = responseBody.trim()
                    ? JSON.parse(responseBody)
                    : [];
    
                return result;
            } catch {
                throw new Error("Erro ao buscar os cursos")
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}