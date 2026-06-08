import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { API_URL } from "../api"
import type { ResponseGetBiosType } from "./types/ResponseGetBiosType"
import { request } from "../httpClient"

export const useGetBios = (
    options?: Omit<UseQueryOptions<ResponseGetBiosType[]>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: ["get-bio"],
        queryFn: async (): Promise<ResponseGetBiosType[]> => {
            return await request(`${API_URL}/bio`)
        },
        ...options,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}