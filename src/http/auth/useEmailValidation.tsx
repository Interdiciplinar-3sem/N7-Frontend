import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api"

type PendingStudentRegistrationDTO = {
    nome: string;
    email: string;
    senha: string;
    semestre: number;
}

export const useEmailValidation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["post-validation"],
        mutationFn: async (data: PendingStudentRegistrationDTO): Promise<string> => {
            const response = await fetch(`${API_URL}/user/confirm/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.status === 409) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 409,
                    message: errorBody.message
                }));
            }

            if (response.status === 400) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 400,
                    message: errorBody.message ?? "E-mail inválido ou fora do domínio institucional."
                }));
            }

            if (!response.ok) {
                throw new Error(`Erro ao enviar email. Status: ${response.status}`);
            }

            return await response.text();
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
        }
    });
};