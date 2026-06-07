import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResponseSignUpType } from "../types/responseSignUpType";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { requestPendingProfessorCreate } from "../types/requestPendingProfessorCreate";

export const useCreateProfessor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["post-professor"],

        mutationFn: async (data: requestPendingProfessorCreate) => {
            const response = await authFecth(
                `${API_URL}/adm/confirm/email/professor`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            if (response.status === 409) {
                const errorBody = await response.json();

                throw {
                    status: 409,
                    message: errorBody.message,
                };
            }

            if (!response.ok) {
                throw new Error(
                    `Erro ao criar usuário! Status: ${response.status}`
                );
            }

            const message = await response.text();

            return {
                message
            } as ResponseSignUpType;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-users"],
            });
        },
    });
};