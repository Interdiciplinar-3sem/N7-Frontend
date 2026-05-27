import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetSubjectType } from "../types/responseGetSubjectType"

export const useGetAllSubjects = () => {
    return useQuery({
        queryKey: ["get-all-subjects"],
        queryFn: async (): Promise<ResponseGetSubjectType[]> => {
            try {
                const response = await authFecth(`${API_URL}/subjects/ativos`)

                 if (!response.ok) {
                    throw new Error("Erro ao buscar resumo!");
                }
                
                const responseBody = await response.text();
                const result: ResponseGetSubjectType[] = responseBody.trim()
                    ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo!" }];

                return result;
            } catch {
                throw new Error("Erro ao buscar resumo!");
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}