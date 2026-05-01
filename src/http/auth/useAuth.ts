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
                return { status: false } as ResponseAuthType
            }

            if(!response.ok){
                throw new Error("Usuario não autenticado!");
            }

            const contentType = response.headers.get("content-type") ?? ""

            if (contentType.includes("application/json")) {
                const result = await response.json() as ResponseAuthType
                return result
            }
            
            return { status: true } as ResponseAuthType
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}