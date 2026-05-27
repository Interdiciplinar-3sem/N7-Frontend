import { useEffect } from "react"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetStudentType } from "../types/responseGetStudentType"
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useGetStudentMe = (
    id: string,
    options?: Omit<UseQueryOptions<ResponseGetStudentType>, "queryKey" | "queryFn">
) => {
    const { showError } = useToast()

    const query = useQuery({
        queryKey: ["get-student-me", id],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/student/me`)

            if (response.status === 401) {
                const errorBody = await response.json().catch(() => ({ message: "Não autorizado" }))
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message ?? "Não autorizado"
                }));
            }

            const contentType = response.headers.get("content-type") ?? ""

            if(contentType.includes("application/json")){
                return (await response.json()) as ResponseGetStudentType
            }

            const responseBody = await response.text();

            if(!responseBody.trim()) {
                throw new Error("A resposta do servidor veio vazia")
            }

            try {
                return JSON.parse(responseBody) as ResponseGetStudentType
            } catch {
                throw new Error("A resposta do servidor não é um JSON válido")
            }
        },
        ...options,
        retry: false,
        refetchOnWindowFocus: true
    })

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar seu perfil"))
        }
    }, [query.error, query.isError, showError])

    return query
}