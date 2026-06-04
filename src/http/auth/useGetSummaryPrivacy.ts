import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetSummaryPrivacyType } from "../types/responseGetSummaryPrivacyType"



export const useGetSummaryPrivacy = (id: string) => {
    return useQuery({
        queryKey: ["summary-privacy", id],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/resumos/${id}/visibilidade`)

            if (response.status === 404) {
                const errorBody = await response.json().catch(() => ({ message: "Não encontrado" }))
                throw new Error(JSON.stringify({
                    status: 404,
                    message: errorBody.message ?? "Não encontrado"
                }));
            }
            if (response.status === 401) {
                const errorBody = await response.json().catch(() => ({ message: "Não autorizado" }))
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message ?? "Não autorizado"
                }));

            }
            if (response.status === 403) {
                const errorBody = await response.json().catch(() => ({ message: "Acesso negado" }))
                throw new Error(JSON.stringify({
                    status: 403,
                    message: errorBody.message ?? "Acesso negado"
                }));



            }
            if (response.status === 500) {
                const errorBody = await response.json().catch(() => ({ message: "Erro interno do servidor" }))
                throw new Error(JSON.stringify({
                    status: 500,
                    message: errorBody.message ?? "Erro interno do servidor"
                }));
            }
            if (!response.ok) {
                throw new Error("Erro ao tentar acessar resumo");
            }
            const bodyResponse = await response.text()

            if (!bodyResponse.trim()) {
                throw new Error("nao foi possivel acessar o resumo - resposta do servidor vazia")
            }

            try {
                return JSON.parse(bodyResponse) as ResponseGetSummaryPrivacyType
            } catch (error) {
                throw new Error("nao foi possivel acessar o resumo - resposta do servidor invalida")
            }


        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}

