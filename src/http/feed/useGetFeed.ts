import { useInfiniteQuery } from "@tanstack/react-query"
import { API_URL } from "../api";
import type { ResponseGetSummaryType } from "../summary/types/ResponseGetSummaryType"; 
import { request } from "../httpClient";

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
            return request<PagedResponse>(
                `${API_URL}/feed/me?page=${pageParam}&size=20`
            );
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

export const useGetRanking = () => {
    return useInfiniteQuery({
        queryKey: ["get-ranking"],

        queryFn: ({ pageParam = 0 }) =>
            request<PagedResponse>(
                `${API_URL}/resumos/ranking?page=${pageParam}&size=20`
            ),

        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) => {
            const totalCarregado =
                allPages.reduce(
                    (acc, p) => acc + p.data.length,
                    0
                );

            if (totalCarregado >= lastPage.total) {
                return undefined;
            }

            return lastPage.page + 1;
        },

        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetSummaryActivated = () => {
    return useInfiniteQuery({
        queryKey: ["get-summary-activated"],
        queryFn: async ({ pageParam = 0 }): Promise<PagedResponse> => {
            return await request<PagedResponse>(
                `${API_URL}/resumos/ativos?page=${pageParam}&size=20`
            );
        },

        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) => {
            const totalCarregado = allPages.reduce((acc, p) => acc + p.data.length, 0);
            if (totalCarregado >= lastPage.total) return undefined;
            return lastPage.page + 1;
        },

        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};