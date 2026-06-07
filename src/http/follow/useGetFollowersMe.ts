import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetFollowingType } from "../types/responseGetFollwingType"
import { useToast } from "../../contexto/toastContext"

export const useGetFollowersMe = (id: number) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["get-followers", id],
        queryFn: async (): Promise<ResponseGetFollowingType[]> => {
            const response = await authFecth(`${API_URL}/follow/followers/me?limit=20`)

            if (response.status === 401) {
                const errorBody = await response.json().catch(() => ({ message: "Não autorizado" }))
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message ?? "Não autorizado"
                }));
            }

            const contentType = response.headers.get("content-type") ?? ""

            if(contentType.includes("application/json")){
                return (await response.json()) as ResponseGetFollowingType[]
            }

            const responseBody = await response.text();

            if(!responseBody.trim()) {
                throw new Error("A resposta do servidor veio vazia")
            }

            try {
                return JSON.parse(responseBody) as ResponseGetFollowingType[]
            } catch {
                throw new Error("A resposta do servidor não é um JSON válido")
            }
        },
        retry: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    })

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar lista de seguidores")
        }
    }, [query.error, query.isError])

    return query
}