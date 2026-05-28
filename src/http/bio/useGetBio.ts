import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetBiosType } from "../types/responseGetBiosType"

export const useGetBios = (
    options?: Omit<UseQueryOptions<ResponseGetBiosType[]>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: ["get-bio"],
        queryFn: async (): Promise<ResponseGetBiosType[]> => {
            try {
                const response = await authFecth(`${API_URL}/bio`)

                if (!response.ok) {
                    const body = await response.text().catch(() => "");
                    throw new Error(`Erro ao buscar bio (${response.status}): ${body}`);
                }
    
                const responseBody = await response.text();
                const result: ResponseGetBiosType[] = responseBody.trim()
                    ? JSON.parse(responseBody)
                    : [];
    
                return result;
            } catch {
                throw new Error("Erro ao buscar bio")
            }
        },
        ...options,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}