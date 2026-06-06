// src/http/tag/useGetTagsDesactivated.ts
import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetTagsType } from "../types/responseGetTagsType";

export const useGetTagsDesactivated = (limit = 50) => {
    return useQuery({
        queryKey: ["get-tags-desactivated", limit],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/tags/desativados?limit=${limit}`);
            if (!response.ok) throw new Error("Erro ao buscar tags desativadas");
            return (await response.json()) as ResponseGetTagsType[];
        },
        staleTime: 1000 * 60 * 5,
    });
};''