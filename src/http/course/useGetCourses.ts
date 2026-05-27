import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export type CourseAdminRow = {
    id: string
    nome: string
    semestre: string
    materias: number
    ativo?: boolean
}

const normalizeSemestre = (value: unknown) => {
    if (typeof value === "number") {
        return `${value} semestres`
    }

    if (typeof value === "string" && value.trim()) {
        return value
    }

    return ""
}

const normalizeCourseRow = (item: Record<string, unknown>): CourseAdminRow => {
    const materias = typeof item.materias === "number"
        ? item.materias
        : typeof item.subjectsCount === "number"
            ? item.subjectsCount
            : typeof item.disciplinas === "number"
                ? item.disciplinas
                : 0

    return {
        id: String(item.id ?? item.courseId ?? item.cursoId ?? ""),
        nome: String(item.nome ?? item.name ?? item.title ?? ""),
        semestre: normalizeSemestre(item.semestre ?? item.semesters ?? item.semester),
        materias,
        ativo: typeof item.ativo === "boolean"
            ? item.ativo
            : typeof item.active === "boolean"
                ? item.active
                : item.status
                    ? String(item.status).toLowerCase() !== "inativo"
                    : true,
    }
}

export const useGetCourses = () => {
    return useQuery({
        queryKey: ["get-courses"],
        queryFn: async (): Promise<CourseAdminRow[]> => {
            try {
                const response = await authFecth(`${API_URL}/courses`)

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

                return result.map((item) => normalizeCourseRow(item as Record<string, unknown>))
            } catch {
                return []
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}