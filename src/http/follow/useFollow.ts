import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api";
import { request } from "../httpClient";
import { useToast } from "../../contexto/toastContext";

import type { ResponseGetFollowingType } from "./types/ResponseGetFollowingType"; 

export const useFollow = (
    targetStudentId: number,
    currentUserId: number
) => {
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

export const useUnFollow = (
    targetStudentId: number,
    currentUserId: number
) => {
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

export const useGetFollowers = (
    currentId: number,
    targetId: number
) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-followers", currentId, targetId],

        queryFn: () =>
            request<ResponseGetFollowingType[]>(
                `${API_URL}/follow/followers/${targetId}?limit=20`
            ),

        retry: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar lista de seguidores");
        }
    }, [query.isError]);

    return query;
};

export const useGetFollowersMe = (id: number) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-followers", id],

        queryFn: () =>
            request<ResponseGetFollowingType[]>(
                `${API_URL}/follow/followers/me?limit=20`
            ),

        retry: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar lista de seguidores");
        }
    }, [query.isError]);

    return query;
};

export const useGetFollowing = (
    currentId: number,
    targetId: number
) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-following", currentId, targetId],

        queryFn: () =>
            request<ResponseGetFollowingType[]>(
                `${API_URL}/follow/following/${targetId}?limit=20`
            ),

        retry: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar lista de seguidos");
        }
    }, [query.isError]);

    return query;
};

export const useGetFollowingMe = (id: number) => {
    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["get-following", id],

        queryFn: () =>
            request<ResponseGetFollowingType[]>(
                `${API_URL}/follow/following/me?limit=20`
            ),

        retry: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar lista de seguidos");
        }
    }, [query.isError]);

    return query;
};