import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../httpClient";
import { API_URL } from "../../api";

const invalidateSummaryQueries = async (
    queryClient: ReturnType<typeof useQueryClient>
) => {
    await queryClient.invalidateQueries({ queryKey: ["get-summary"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summary-desactivated"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-me"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-student"] });
    await queryClient.invalidateQueries({ queryKey: ["get-summaries-subject"] });
};

export const useDeleteSummary = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-summary"],
        mutationFn: () =>
            request<{ message: string }>(
                `${API_URL}/resumos/${id}`,
                { method: "DELETE" }
            ),
        onSuccess: () => invalidateSummaryQueries(queryClient),
    });
};