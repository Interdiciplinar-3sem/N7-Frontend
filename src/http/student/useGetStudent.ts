import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetStudentType } from "../types/responseGetStudent"

export const useGetStudent = (id: string) => {
    return useQuery({
        queryKey: ["get-student", id], //preciso passar um dado unique aqui
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
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}