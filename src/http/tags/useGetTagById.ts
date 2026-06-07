// src/http/tags/useGetTagById.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";
import type { ResponseGetTagsType } from "../types/responseGetTagsType";
import { useToast } from "../../contexto/toastContext";

export const useGetTagById = (id: number) => {
    const { showError } = useToast();
    const query = useQuery({
        queryKey: ["get-tag-by-id", id],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/tags/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar detalhes da tag");
            return (await response.json()) as ResponseGetTagsType;
        },
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) showError("Erro ao buscar tag");
    }, [query.error, query.isError]);

    return query;
};