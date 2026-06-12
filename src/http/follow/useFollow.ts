import { useEffect, useRef } from "react";
import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api";
import { request } from "../httpClient";
import { useToast } from "../../contexto/toastContext";
import type { ResponseGetFollowingType } from "./types/ResponseGetFollowingType";

export type FollowPageDTO = {
    data: ResponseGetFollowingType[];
    page: number;
    size: number;
    total: number;
};

const PAGE_SIZE = 20;

async function fetchFollowPage(url: string, page: number): Promise<FollowPageDTO> {
    return request<FollowPageDTO>(`${url}?page=${page}&size=${PAGE_SIZE}`);
}

function getNextPageParam(lastPage: FollowPageDTO) {
    const loadedUpToNow = (lastPage.page + 1) * lastPage.size;
    if (loadedUpToNow >= lastPage.total) return undefined;
    return lastPage.page + 1;
}

export const useFollow = (targetStudentId: number, currentUserId: number) => {
    const queryClient = useQueryClient();
    const { showError, showSuccess } = useToast();

    return useMutation({
        mutationKey: ["post-follow", currentUserId, targetStudentId],

        mutationFn: () =>
            request<{ message: string }>(
                `${API_URL}/follow/${targetStudentId}`,
                { method: "POST" }
            ),

        onSuccess: async (result) => {
            await queryClient.invalidateQueries({ queryKey: ["get-followers", currentUserId, targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId, targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-student", targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-student-me", currentUserId] });
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId] });
            await queryClient.invalidateQueries({ queryKey: ["get-feed", currentUserId] });

            showSuccess(result.message ?? "Agora você está seguindo este usuário");
        },

        onError: () => {
            showError("Erro ao seguir usuário");
        },
    });
};

export const useUnFollow = (targetStudentId: number, currentUserId: number) => {
    const queryClient = useQueryClient();
    const { showError, showSuccess } = useToast();

    return useMutation({
        mutationKey: ["delete-follow", currentUserId, targetStudentId],

        mutationFn: () =>
            request<{ message: string }>(
                `${API_URL}/follow/${targetStudentId}`,
                { method: "DELETE" }
            ),

        onSuccess: async (result) => {
            await queryClient.invalidateQueries({ queryKey: ["get-followers", currentUserId, targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId, targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-student", targetStudentId] });
            await queryClient.invalidateQueries({ queryKey: ["get-student-me", currentUserId] });
            await queryClient.invalidateQueries({ queryKey: ["get-following", currentUserId] });
            await queryClient.invalidateQueries({ queryKey: ["get-feed", currentUserId] });

            showSuccess(result.message ?? "Você deixou de seguir este usuário");
        },

        onError: () => {
            showError("Erro ao deixar de seguir usuário");
        },
    });
};

export const useGetFollowers = (currentId: number, targetId: number) => {
    const { showError } = useToast();

    const query = useInfiniteQuery({
        queryKey: ["get-followers", currentId, targetId],
        queryFn: ({ pageParam = 0 }) =>
            fetchFollowPage(`${API_URL}/follow/followers/${targetId}`, pageParam as number),
        initialPageParam: 0,
        getNextPageParam,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    useEffect(() => {
        if (query.isError) showError("Erro ao carregar lista de seguidores");
    }, [query.isError]);

    return query;
};

export const useGetFollowersMe = (id: number) => {
    const { showError } = useToast();

    const query = useInfiniteQuery({
        queryKey: ["get-followers", id],
        queryFn: ({ pageParam = 0 }) =>
            fetchFollowPage(`${API_URL}/follow/followers/me`, pageParam as number),
        initialPageParam: 0,
        getNextPageParam,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    useEffect(() => {
        if (query.isError) showError("Erro ao carregar lista de seguidores");
    }, [query.isError]);

    return query;
};

export const useGetFollowing = (currentId: number, targetId: number) => {
    const { showError } = useToast();

    const query = useInfiniteQuery({
        queryKey: ["get-following", currentId, targetId],
        queryFn: ({ pageParam = 0 }) =>
            fetchFollowPage(`${API_URL}/follow/following/${targetId}`, pageParam as number),
        initialPageParam: 0,
        getNextPageParam,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    useEffect(() => {
        if (query.isError) showError("Erro ao carregar lista de seguidos");
    }, [query.isError]);

    return query;
};

export const useGetFollowingMe = (id: number) => {
    const { showError } = useToast();

    const query = useInfiniteQuery({
        queryKey: ["get-following", id],
        queryFn: ({ pageParam = 0 }) =>
            fetchFollowPage(`${API_URL}/follow/following/me`, pageParam as number),
        initialPageParam: 0,
        getNextPageParam,
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!id,
    });

    useEffect(() => {
        if (query.isError) showError("Erro ao carregar lista de seguidos");
    }, [query.isError]);

    return query;
};

export function useInfiniteScrollSentinel(
    fetchNextPage: () => void,
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean
) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return ref;
}