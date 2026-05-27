import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { CourseAdminRow } from "./useGetCourses"

export const useGetCoursesDesactivated = () => {
    return useQuery({
        queryKey: ["get-courses-desactivated"],
        queryFn: async (): Promise<CourseAdminRow[]> => {
            try {
                const response = await authFecth(`${API_URL}/courses/desativados`)

                if (!response.ok) {
                    return []
                }

                const responseBody = await response.text()

                if (!responseBody.trim()) {
                    return []
                }

                const result = JSON.parse(responseBody)

                if (!Array.isArray(result)) {
                    return []
                }

                return result.map((item) => ({
                    id: String(item.id ?? item.courseId ?? item.cursoId ?? ""),
                    nome: String(item.nome ?? item.name ?? item.title ?? ""),
                    semestre: typeof item.semestre === "number"
                        ? `${item.semestre} semestres`
                        : String(item.semestre ?? item.semesters ?? item.semester ?? ""),
                    materias: typeof item.materias === "number"
                        ? item.materias
                        : typeof item.subjectsCount === "number"
                            ? item.subjectsCount
                            : typeof item.disciplinas === "number"
                                ? item.disciplinas
                                : 0,
                    ativo: typeof item.ativo === "boolean"
                        ? item.ativo
                        : typeof item.active === "boolean"
                            ? item.active
                            : false,
                }))
            } catch {
                return []
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}