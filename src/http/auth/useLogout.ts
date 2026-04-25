import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseLogutType } from "../types/responseLogoutType"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["user-logout"],
        mutationFn: async () => {
            const response = await authFecth(`${API_URL}/auth/logout`, {
                method: "POST",
            })

            if(!response.ok){
                throw new Error("Não foi possivel realizar o logout!");
            }

            const responseBody = await response.text();
            const result: ResponseLogutType = responseBody.trim()
                ? JSON.parse(responseBody)
                : { message: "Logout realizado com sucesso" };
            return result;
        },
        onSuccess: async () => {
            queryClient.setQueryData(["user-auth"], {
                status: false
            })

            await queryClient.invalidateQueries({ queryKey: ["user-auth"] })

            navigate("/login", { replace: true})
        }
    })

}