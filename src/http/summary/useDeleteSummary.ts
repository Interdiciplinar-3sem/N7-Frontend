import { useMutation } from "@tanstack/react-query"
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useDeleteSummary = (id: string) => {
    return useMutation({
        mutationKey: ["delete-summary"],
        mutationFn: async () => {
            const response = await authFecth(`${API_URL}/resumos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if(!response.ok){
                throw new Error("Erro ao deletar resumo!"); //precisa cobrir mais excessões posteriormente
            }

            const responseBody = await response.text();
            const result = responseBody.trim()
                ? JSON.parse(responseBody) : { message: "Sucesso ao deletar resumo!"};
            return result;
        },
        onSuccess: () => {
            //invalidar querrys corretamente
        }
    })
}