import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import { API_URL } from "../api";

export function useLikeSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (summaryId: number) => {
      const response = await authFecth(
        `${API_URL}/resumos/${summaryId}/like`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao curtir resumo");
      }

      return response.text();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-summary"],
      });

      await queryClient.refetchQueries({
        queryKey: ["get-summary"],
        type: "active",
      });
    },
  });
}