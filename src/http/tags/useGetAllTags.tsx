import { useQuery } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseGetTagsType } from "../types/responseGetTagsType"

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async (): Promise<ResponseGetTagsType[]> => {
            const response = await authFecth(`${API_URL}/tags`, {
                method: "GET",
            })

            if(!response.ok){ throw new Error(`Erro ao buscar tags! Status: ${response.status}`) }

            const tags = await response.json();
            return tags;
        },
        staleTime: 1000 * 60  * 15,
        retry: 2
    })
}