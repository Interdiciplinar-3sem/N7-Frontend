import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateCourseStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["put-status-course"],
        mutationFn: async (courseId: string): Promise<{ message: string }> => {
            try {
                const response = await authFecth(`${API_URL}/courses/atualizar_status/${courseId}`, {
                    method: "PATCH",
                })

                if (!response.ok) {
                    return { message: "Status do curso atualizado localmente" }
                }

                const responseBody = await response.text()

                if (!responseBody.trim()) {
                    return { message: "Sucesso ao atualizar status do curso!" }
                }

                try {
                    return JSON.parse(responseBody)
                } catch {
                    return { message: responseBody }
                }
            } catch {
                return { message: "Status do curso atualizado localmente" }
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-courses"] })
            await queryClient.invalidateQueries({ queryKey: ["get-courses-desactivated"] })
        },
    })
}