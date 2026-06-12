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

type SearchParams = {
    busca?: string;
    subjectId?: number;
    tagId?: number;
    semestre?: number;
};
 
export const useSearchSummaries = ({ busca, subjectId, tagId, semestre }: SearchParams) => {
    return useInfiniteQuery({
        queryKey: ["search-summaries", busca, subjectId, tagId, semestre],
 
        queryFn: async ({ pageParam = 0 }): Promise<PagedResponse> => {
            const params = new URLSearchParams();
            params.set("page", String(pageParam));
            params.set("size", "20");
            if (busca?.trim())  params.set("busca",     busca.trim());
            if (subjectId)      params.set("subjectId", String(subjectId));
            if (tagId)          params.set("tagId",     String(tagId));
            if (semestre)       params.set("semestre",  String(semestre));
 
            return request<PagedResponse>(
                `${API_URL}/resumos/ativos?${params.toString()}`
            );
        },
 
        initialPageParam: 0,
 
        getNextPageParam: (lastPage, allPages) => {
            const totalCarregado = allPages.reduce((acc, p) => acc + p.data.length, 0);
            if (totalCarregado >= lastPage.total) return undefined;
            return lastPage.page + 1;
        },
        enabled: true,
        staleTime: 1000 * 60 * 2,
        retry: false,
    });
};