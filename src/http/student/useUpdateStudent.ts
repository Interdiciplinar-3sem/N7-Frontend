import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { RequestUpdateStudentType } from "../types/requestUpdateStudentType"
import type { ResponseUpdateStudentType } from "../types/responseUpdateStudent"
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useUpdateStudent = (id: number) => {
    const queryClient = useQueryClient();
    const { showError, showSuccess } = useToast()

    return useMutation({
        mutationKey: ["update-student", id],
        mutationFn: async (data: RequestUpdateStudentType) => {
            const response = await authFecth(`${API_URL}/student/${id}`, {
                body: JSON.stringify(data),
                method: "PUT"
            })

            if(response.status === 404){
                const erroBopdy = await response.json().catch(() => ({message: "Erro ao encontrar aluno"}))
                throw new Error(JSON.stringify({
                    status: 404,
                    message: erroBopdy.message ?? "Aluno não encontrado"
                }))
            }

            const contentType = response.headers.get("content-type") ?? ""

            if(contentType.includes("application/json")){
                return (await response.json()) as ResponseUpdateStudentType
            }

            const bodyResponse = await response.text()

            if(!bodyResponse.trim()){
                return {} as ResponseUpdateStudentType
            }

            try {
                return JSON.parse(bodyResponse) as ResponseUpdateStudentType
            } catch {
                console.warn("Resposta do servidor não é JSON válido ao atualizar aluno; retornando vazio:", bodyResponse)
                return {} as ResponseUpdateStudentType
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] })
            await queryClient.invalidateQueries({ queryKey: ["get-users-desactivated"] })
            await queryClient.invalidateQueries({ queryKey: ["get-student", id] })
            await queryClient.invalidateQueries({ queryKey: ["get-student-me", id] })
            await queryClient.invalidateQueries({ queryKey: ["get-feed", id] })
            await queryClient.invalidateQueries({ queryKey: ["get-ranking", id] })
            showSuccess("Perfil atualizado com sucesso")
        },
        onError: (error) => {
            showError(getErrorMessage(error, "Erro ao atualizar perfil"))
        }
    })
}