import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export const useDeleteSummary = (id: number) => {
    const queryClient = useQueryClient();

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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
            await queryClient.invalidateQueries({ queryKey: ["get-summaries-subject"] });

            await queryClient.refetchQueries({ queryKey: ["get-summary"], type: "active" });
            await queryClient.refetchQueries({ queryKey: ["get-summary-desactivated"], type: "active" });
            await queryClient.refetchQueries({ queryKey: ["get-summaries-me"], type: "active" });
            await queryClient.refetchQueries({ queryKey: ["get-summaries-student"], type: "active" });
            await queryClient.refetchQueries({ queryKey: ["get-summaries-subject"], type: "active" });
        }
    })
}