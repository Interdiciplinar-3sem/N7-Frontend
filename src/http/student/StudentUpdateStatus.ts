import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useUpdateActiveStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-active-user"],
        mutationFn: async (userId: number) => {
            const response = await authFecth(`${API_URL}/user/atualizar_status/${userId}`, {
                method: "PATCH",
            })
            
            if(!response.ok){ throw new Error(`Erro ao atualizar usuario! Status: ${response.status}`) }

            return { message: "Usuario atualizado com sucesso" };
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
            await queryClient.invalidateQueries({ queryKey: ["get-users-desactivated"] });
        }
    })
}