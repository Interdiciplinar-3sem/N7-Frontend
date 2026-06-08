import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { responseGetAdminDashboardStatsType } from "./types/responseGetAdminDashboardStatsType" 

export const useGetAdminStats = () => {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: async (): Promise<responseGetAdminDashboardStatsType> => {
            const response = await authFecth(`${API_URL}/admin/stats`)
            if (!response.ok) throw new Error("Erro ao buscar estatísticas")
            return response.json()
        },
        staleTime: 1000 * 60 * 2,
        retry: false,
    })
}