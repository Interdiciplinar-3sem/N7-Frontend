import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../api";
import { request } from "../../httpClient";
import type { ResponseGetTagsType } from "../types/ResponseGetTagsType";
import { useToast } from "../../../contexto/toastContext";

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async (): Promise<ResponseGetTagsType[]> => {
            return request<ResponseGetTagsType[]>(
                `${API_URL}/tags`
            );
        },
        staleTime: 1000 * 60 * 15,
        retry: 2,
    });
};

export const useGetTagsDesactivated = (limit = 50) => {
    return useQuery({
        queryKey: ["get-tags-desactivated", limit],
        queryFn: async (): Promise<ResponseGetTagsType[]> => {
            return request<ResponseGetTagsType[]>(
                `${API_URL}/tags/desativados?limit=${limit}`
            );
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetTagById = (id: number) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-tag-by-id", id],
        queryFn: async (): Promise<ResponseGetTagsType> => {
            return request<ResponseGetTagsType>(
                `${API_URL}/tags/${id}`
            );
        },
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao buscar tag");
        }
    }, [query.error, query.isError]);

    return query;
};