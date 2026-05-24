import { useMutation } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { RequestUpdateSummaryPrivacyType } from "../types/requestUpdateSummaryPrivacyType"
import type { ResponseUpdateSummaryPrivacyType } from "../types/responseUpdateSummaryPrivacyType"

export const useUpdateSummaryPrivacy = (id: string) => {
    return useMutation({
        mutationKey: ["update-summary-privacy", id], //preciso passar um dado unique aqui
        mutationFn: async (data: RequestUpdateSummaryPrivacyType) => {
            const response = await authFecth(`${API_URL}/summary/privacy/${id}`, {
                body: JSON.stringify(data),
                method: "PUT"
            })
            //404, 401, 403, 500
            if (response.status === 404) {
                const erroBopdy = await response.json().catch(() => ({ message: "Erro ao atualizar o resumo" }))
                throw new Error(JSON.stringify({
                    status: 404,
                    message: erroBopdy.message ?? "Resumo não atualizado"
                }))

            }
            if (response.status === 401) {
                const errorBody = await response.json().catch(() => ({ message: "Não autorizado" }))
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message ?? "Não autorizado"
                }))
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
                throw new Error("Erro ao tentar atualizar o resumo");
            }
            const bodyResponse = await response.text()

            if (!bodyResponse.trim()) {
                throw new Error("nao foi possivel atualizar o resumo - resposta do servidor vazia")
            }

            try {
                return JSON.parse(bodyResponse) as ResponseUpdateSummaryPrivacyType
            } catch (error) {
                throw new Error("nao foi possivel atualizar o resumo - resposta do servidor invalida")
            }

        }
    })
}