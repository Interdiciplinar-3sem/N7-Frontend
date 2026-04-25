import { useMutation } from "@tanstack/react-query"
import type { RequestSignUpType } from "../types/requestSignUpType"
import type { ResponseSignUpType } from "../types/responseSignUpType"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import { useNavigate } from "react-router-dom"

export const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["post-user"],
        mutationFn: async (data: RequestSignUpType): Promise<ResponseSignUpType> => {
            const response = await authFecth(`${API_URL}/user`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            
            if(response.status === 409) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 409,
                    message: errorBody.message
                }))
            }

            if(!response.ok){ throw new Error(`Erro ao criar usuario! Status: ${response.status}`) }

            const responseBody = await response.text()
            const result: ResponseSignUpType = responseBody.trim()
                ? JSON.parse(responseBody)
                : { message: "Usuario criado com sucesso", id: "" }

            return result;
        },
        onSuccess: async () => {
            navigate("/login", { replace: true })
        }
    })
}