import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export const useToggleStudentStatusByStudentId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["toggle-student-status-by-student-id"],
        mutationFn: async (studentId: number) => {
            const response = await authFecth(`${API_URL}/user/atualizar_status/student/${studentId}`, {
                method: "PATCH",
            });
            if (!response.ok) {
                throw new Error(`Erro ao atualizar status do aluno. Status: ${response.status}`);
            }
            return { message: "Status atualizado com sucesso" };
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
            await queryClient.invalidateQueries({ queryKey: ["get-users-desactivated"] });
            await queryClient.invalidateQueries({ queryKey: ["get-student"] });
            await queryClient.invalidateQueries({ queryKey: ["get-student-me"] });
        }
    });
};