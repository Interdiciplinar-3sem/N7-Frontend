import { useMutation } from "@tanstack/react-query"
import { authFecth } from "../authFetch"

export const useUpdateStatusSummary = () => {
    return useMutation({
        mutationKey: ["put-status-summary"],
        mutationFn: async (id: string): Promise<{ message: string }> => {
            const response = await authFecth(`/resumos/atualizar_status/${id}`, {
                method: "PATCH",
            })

            if(!response.ok){
                throw new Error("Erro ao atualizar resumo!"); 
            }

            const responseBody = await response.text();
            const result = responseBody.trim()
                ? JSON.parse(responseBody) : { message: "Sucesso ao atualizar status do resumo!"};
            return result;
        }
    })
}