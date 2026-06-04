import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useUnFollow = (targetStudentId: number, currentUserId: number) => {
    const queryClient = useQueryClient();
    const { showError, showSuccess } = useToast()

    return useMutation({
        mutationKey: ["delete-follow", currentUserId, targetStudentId],
        mutationFn: async () => {
            const response = await authFecth(`${API_URL}/follow/${targetStudentId}`, {
                method: "DELETE",
            })

            if (response.status === 401) {
                const errorBody = await response.json().catch(() => ({ message: "Não autorizado" }))
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message ?? "Não autorizado"
                }));
            }

            const contentType = response.headers.get("content-type") ?? "";

            if(contentType.includes("application/json")){
                const json = await response.json().catch(() => ({ message: response.statusText ?? "" }));
                return json as { message: string };
            }

            const responseBody = await response.text();

            if(!responseBody.trim()) {
                throw new Error("A resposta do servidor veio vazia")
            }

            try {
                const parsed = JSON.parse(responseBody);
                if (parsed && typeof parsed === "object" && "message" in parsed) {
                    return parsed as { message: string };
                }
                return { message: String(parsed) };
            } catch {
                // Se o servidor retornou texto simples (ex: "Deixou de seguir"), empacota como { message }
                return { message: responseBody };
            }
        },
        onSuccess: async (result) => {
            await queryClient.invalidateQueries({ queryKey: ["get-followers", currentUserId, targetStudentId] })
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId, targetStudentId] })
            await queryClient.invalidateQueries({ queryKey: ["get-student", targetStudentId] })
            await queryClient.invalidateQueries({ queryKey: ["get-student-me", currentUserId] })
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId] })
            await queryClient.invalidateQueries({ queryKey: ["get-feed", currentUserId] })
            showSuccess(result.message || "Você deixou de seguir este usuário")
        },
        onError: (error) => {
            showError(getErrorMessage(error, "Erro ao deixar de seguir usuário"))
        },
    })
}