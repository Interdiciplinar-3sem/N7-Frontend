import { useMutation } from "@tanstack/react-query"

export const useDeleteSummary = (id: string) => {
    return useMutation({
        mutationKey: ["delete-summary"],
        mutationFn: async () => {
            const response = await fetch(`/resumos:${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if(!response.ok){
                throw new Error("Erro ao atualizar resumo!"); //precisa cobrir mais excessões posteriormente
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