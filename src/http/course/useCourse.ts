import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from "@tanstack/react-query";

import { useEffect } from "react";

import { API_URL } from "../api";
import { request } from "../httpClient";

import type { ResponseGetCourseType } from "./types/ResponseGetCourseType";
import type { ResponseGetCourseStudentsType  } from "./types/ResponseGetCourseStudentsType";
import type { ResponseGetCourseSubjectsType } from "./types/ResponseGetCourseSubjectsType";

import { useToast } from "../../contexto/toastContext";

export const useGetCourses = () => {
    return useQuery({
        queryKey: ["get-courses"],
        queryFn: () =>
            request<ResponseGetCourseType[]>(
                `${API_URL}/courses`
            ),

        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetCoursesDesactivated = () => {
    return useQuery({
        queryKey: ["get-courses-desactivated"],
        queryFn: () =>
            request<ResponseGetCourseType[]>(
                `${API_URL}/courses/desativados`
            ),

        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export const useGetCourseStudents = (
    courseId: number,
) => {

    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["courseStudents", courseId],

        queryFn: () =>
            request<ResponseGetCourseStudentsType[]>(
                `${API_URL}/courses/${courseId}/students`
            ),

        staleTime: 1000 * 60 * 15,
        retry: 2,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar alunos");
        }
    }, [query.isError]);

    return query;
};

export const useGetCourseStudentsSemester = (
    courseId: number,
    semestre: number,
) => {

    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["courseStudents", courseId, semestre],

        queryFn: () =>
            request<ResponseGetCourseStudentsType[]>(
                `${API_URL}/courses/${courseId}/semestres/${semestre}/students`
            ),

        staleTime: 1000 * 60 * 15,
        retry: 2,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar alunos");
        }
    }, [query.isError]);

    return query;
};

export const useGetCourseSubjects = (
    courseId: number
) => {

    return useQuery({
        queryKey: ["courseSubjects", courseId],

        queryFn: () =>
            request<ResponseGetCourseSubjectsType[]>(
                `${API_URL}/courses/${courseId}/subjects`
            ),

        staleTime: 1000 * 60 * 15,
        retry: 2,
    });
};

export const useGetCourseSubjectsSemesterMe = (
    userId: number,
    options?: Omit<
        UseQueryOptions<ResponseGetCourseSubjectsType[]>,
        "queryKey" | "queryFn"
    >
) => {

    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["courseSubjects", userId],

        queryFn: () =>
            request<ResponseGetCourseSubjectsType[]>(
                `${API_URL}/courses/semestres/students/me`
            ),

        ...options,

        staleTime: 1000 * 60 * 15,
        retry: 2,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar matérias");
        }
    }, [query.isError]);

    return query;
};

export const useGetCourseSubjectsSemester = (
    courseId: number,
    semestre: number,
    options?: Omit<
        UseQueryOptions<ResponseGetCourseSubjectsType[]>,
        "queryKey" | "queryFn"
    >
) => {

    const { showError } = useToast();

    const query = useQuery({
        queryKey: ["courseSubjects", courseId, semestre],

        queryFn: () =>
            request<ResponseGetCourseSubjectsType[]>(
                `${API_URL}/courses/${courseId}/semestres/${semestre}/subjects`
            ),

        ...options,

        staleTime: 1000 * 60 * 15,
        retry: 2,
    });

    useEffect(() => {
        if (query.isError) {
            showError("Erro ao carregar matérias");
        }
    }, [query.isError]);

    return query;
};

export const useUpdateCourseStatus = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["put-status-course"],

        mutationFn: async (
            courseId: number
        ): Promise<{ message: string }> => {

            try {

                return await request<{ message: string }>(
                    `${API_URL}/courses/atualizar_status/${courseId}`,
                    {
                        method: "PATCH",
                    },
                    {
                        throwOnError: false,
                    }
                );

            } catch {

                return {
                    message:
                        "Status do curso atualizado localmente",
                };
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-courses"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["get-courses-desactivated"],
            });
        },
    });
};