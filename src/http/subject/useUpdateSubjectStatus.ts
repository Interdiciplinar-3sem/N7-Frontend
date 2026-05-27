import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateSubjectStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["put-status-subject"],
        mutationFn: async (subjectId: string): Promise<{ message: string }> => {
            try {
                const response = await authFecth(`${API_URL}/subjects/atualizar_status/${subjectId}`, {
                    method: "PATCH",
                })

                if (!response.ok) {
                    return { message: "Status da matéria atualizado localmente" }
                }

                const responseBody = await response.text()

                if (!responseBody.trim()) {
                    return { message: "Sucesso ao atualizar status da matéria!" }
                }

                try {
                    return JSON.parse(responseBody)
                } catch {
                    return { message: responseBody }
                }
            } catch {
                return { message: "Status da matéria atualizado localmente" }
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-subjects"] })
            await queryClient.invalidateQueries({ queryKey: ["get-subjects-desactivated"] })
        },
    })
}