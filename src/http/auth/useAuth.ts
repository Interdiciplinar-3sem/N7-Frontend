import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseAuthType } from "../types/responseAuthType"

export const useAuth = () => {
    return useQuery({

        queryKey: ["user-auth"],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/auth`, {
                method: "GET"
            })

            if (response.status === 401 || response.status === 403) {
                return { status: false }
            }

            if(!response.ok){
                throw new Error("Usuario não autenticado!");
            }

            const responseBody = await response.text()
            if (!responseBody.trim()) {
                return { status: true }
            }

            const result: ResponseAuthType = JSON.parse(responseBody);
            return result;
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}