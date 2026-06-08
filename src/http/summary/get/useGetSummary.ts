import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { request } from "../../httpClient";
import { API_URL } from "../../api"; 
import type { ResponseGetSummaryType } from "../types/ResponseGetSummaryType";

export const useGetAllSummary = () => {
    return useQuery({
        queryKey: ["get-summary"],
        queryFn: () =>
            request<ResponseGetSummaryType[]>(
                `${API_URL}/resumos?limit=20`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetSummaryDesactivated = () => {
    return useQuery({
        queryKey: ["get-summary-desactivated"],
        queryFn: () =>
            request<ResponseGetSummaryType[]>(
                `${API_URL}/resumos/desativados`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetSummaryId = (id: number) => {
    return useQuery({
        queryKey: ["get-summary", id],
        queryFn: () =>
            request<ResponseGetSummaryType>(
                `${API_URL}/resumos/${id}`
            ),
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!id,
    });
};

export const useGetSummaryMe = (
    options?: Omit<
        UseQueryOptions<ResponseGetSummaryType[]>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: ["get-summaries-me"],
        queryFn: () =>
            request<ResponseGetSummaryType[]>(
                `${API_URL}/resumos/me`
            ),
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};

export const useGetSummaryStudentId = (
    id: number,
    options?: Omit<
        UseQueryOptions<ResponseGetSummaryType[]>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: ["get-summaries-student", id],
        queryFn: () =>
            request<ResponseGetSummaryType[]>(
                `${API_URL}/resumos/student/${id}`
            ),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
        ...options,
    });
};

export const useGetSummarySubjectId = (
    subjectId: number,
) => {
    return useQuery({
        queryKey: ["get-summaries-subject", subjectId],
        queryFn: () =>
            request<ResponseGetSummaryType[]>(
                `${API_URL}/resumos/subject/${subjectId}`
            ),
        staleTime: 1000 * 60 * 5,
        enabled: !!subjectId,
    });
};