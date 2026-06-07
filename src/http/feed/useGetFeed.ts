import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import { useToast } from "../../contexto/toastContext"
import { getErrorMessage } from "../utils/getErrorMessage"
import type { ResponseGetSummaryType } from "../types/responseGetSummary";

type PagedResponse = {
  data: ResponseGetSummaryType[]
  page: number
  size: number
  totalElements: number
}

export const useGetFeed = (id: number) => {
    const { showError } = useToast()

    const query = useInfiniteQuery({
        queryKey: ["get-feed", id],
        queryFn: async ({ pageParam = 0 }): Promise<PagedResponse> => {
            const response = await authFecth(`${API_URL}/feed/me?limit=20&offset=${pageParam}`)
            
            if(!response.ok){
                throw new Error("Erro ao buscar feed!");
            }
            return response.json();
        },

         initialPageParam: 0,

        getNextPageParam: (lastPage) => {
            const fetched = lastPage.page * lastPage.size + lastPage.data.length
            if (fetched >= lastPage.totalElements) return undefined
            return lastPage.page + 1
        },

        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!id
    })

    useEffect(() => {
        if (query.isError) {
            showError(getErrorMessage(query.error, "Erro ao carregar feed"))
        }
    }, [query.error, query.isError, showError])

    return query
}