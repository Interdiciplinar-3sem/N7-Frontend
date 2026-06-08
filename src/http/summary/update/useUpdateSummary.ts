import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../httpClient";
import { API_URL } from "../../api";
import type { RequestUpdateSummaryType } from "../types/RequestUpdateSummaryType";
import type { ResponseUpdateSummaryType } from "../types/ResponseUpdateSummaryType";
import { useToast } from "../../../contexto/toastContext";

const invalidateSummaryQueries = async (
    queryClient: ReturnType<typeof useQueryClient>
) => {
    await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summary-activated"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-subject"] });
    
};

export const useAssignBadge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["assign-badge"],
        mutationFn: ({
            summaryId,
            badgeId,
        }: {
            summaryId: number;
            badgeId: number;
        }) =>
            request<{ message: string }>(
                `${API_URL}/resumos/${summaryId}/badge/${badgeId}`,
                { method: "PATCH" }
            ),
        onSuccess: () => invalidateSummaryQueries(queryClient),
    });
};

export const useReportSummary = () => {
    const queryClient = useQueryClient();
    const { showError } = useToast();

    return useMutation({
        mutationKey: ["report-summary"],
        mutationFn: (summaryId: number) =>
            request<{ message: string }>(
                `${API_URL}/resumos/reportar/${summaryId}`,
                { method: "PATCH" }
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get-summary"],
            }),
        onError: (error) => {
            showError(error instanceof Error ? error.message : "Erro ao reportar resumo.");
        }
    });
};

export const useUpdateStatusSummary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["put-status-summary"],
        mutationFn: (id: number) =>
            request<{ message: string }>(
                `${API_URL}/resumos/atualizar_status/${id}`,
                { method: "PATCH" }
            ),
        onSuccess: () => invalidateSummaryQueries(queryClient),
    });
};

export const useUpdateSummary = (
    summaryId: number
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["put-summary", summaryId],
        mutationFn: (
            data: RequestUpdateSummaryType
        ) =>
            request<ResponseUpdateSummaryType>(
                `${API_URL}/resumos/${summaryId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                }
            ),
        onSuccess: () => invalidateSummaryQueries(queryClient),
    });
};