import { useInfiniteQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetSummaryType } from "../types/responseGetSummary";

type PagedResponse = {
    data: ResponseGetSummaryType[]
    page: number
    size: number
    total: number 
}

export const useGetFeed = (id: number) => {
    return useInfiniteQuery({
        queryKey: ["get-feed", id],
        queryFn: async ({ pageParam = 0 }): Promise<PagedResponse> => {
            const response = await authFecth(
                `${API_URL}/feed/me?page=${pageParam}&size=20`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar feed!");
            }
            return response.json();
        },

        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) => {
            const totalCarregado = allPages.reduce((acc, p) => acc + p.data.length, 0);

            if (totalCarregado >= lastPage.total) return undefined;

            return lastPage.page + 1;
        },

        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!id,
    });
};