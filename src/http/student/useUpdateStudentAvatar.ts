import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"

export type RequestUpdateStudentAvatarType = {
  avatarId: number
}

export const useUpdateStudentAvatar = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-student-avatar", id],
    mutationFn: async (data: RequestUpdateStudentAvatarType) => {
      const response = await authFecth(`${API_URL}/student/${id}/avatar`, {
        body: JSON.stringify(data),
        method: "PUT"
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: "Erro ao atualizar avatar" }))
        throw new Error(JSON.stringify({
          status: response.status,
          message: errorBody.message ?? "Erro ao atualizar avatar"
        }))
      }

      const contentType = response.headers.get("content-type") ?? ""

      if (contentType.includes("application/json")) {
        return await response.json()
      }

      return null
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-student", id] })
    }
  })
}
