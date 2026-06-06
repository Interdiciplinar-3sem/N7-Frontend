import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api"
import type { ResponseLoginType } from "../types/responseLoginType"
import { checkCookies } from "../../hooks/useCheckCookies";

export const useConfirmEmail = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["confirm-email", token],
        mutationFn: async (): Promise<ResponseLoginType> => {
            const response = await fetch(`${API_URL}/user/email?token=${token}`, {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 409) {
                throw new Error("Essa conta já foi confirmada.");
            }

            if (!response.ok) {
                throw new Error(`Erro ao confirmar conta. Status: ${response.status}`);
            }

            const text = await response.text();
            return text.trim() ? JSON.parse(text) : { message: "", token: "" };
        },

        onSuccess: async (data) => {
            const cookiesWork = checkCookies();
            if (!cookiesWork && data.token) {
                localStorage.setItem("accessToken", data.token);
            }
            queryClient.setQueryData(["user-auth"], { status: true });
            await queryClient.invalidateQueries({ queryKey: ["user-auth"] });
        }
    });
};