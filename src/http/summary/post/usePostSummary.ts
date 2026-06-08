import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../httpClient";
import { API_URL } from "../../api";
import type { RequestCreateSummaryType } from "../types/RequestCreateSummaryType";
import type { ResponseCreateSummaryType } from "../types/ResponseCreateSummaryType";

export const usePostSummary = () => {
    const queryClient = useQueryClient();

    const invalidateSummaryQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
        await queryClient.invalidateQueries({ queryKey: ["get-summaries-subject"] });
    };

    return useMutation({
        mutationKey: ["post-summary"],
        mutationFn: (data: RequestCreateSummaryType) =>
            request<ResponseCreateSummaryType>(
                `${API_URL}/resumos`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            ),
        onSuccess: invalidateSummaryQueries,
    });
};