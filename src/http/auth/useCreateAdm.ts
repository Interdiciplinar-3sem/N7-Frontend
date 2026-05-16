import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import { useNavigate } from "react-router-dom"
import type { RequestCreateAdmType } from "../types/requestCreateAdm"

export const useCreateAdm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["post-adm"],
        mutationFn: async (data: RequestCreateAdmType) => {

            console.log(data)
            const response = await authFecth(`${API_URL}/user/adm`, {
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
            const result = responseBody.trim()
                ? JSON.parse(responseBody)
                : { message: "Usuario criado com sucesso", id: "" }

            return result;
        },
        onSuccess: async () => {
            if(["cadastro"].includes(window.location.pathname)){ 
                navigate("/login", { replace: true })
            }

            await queryClient.invalidateQueries({ queryKey: ["get-users"] });
           
        }
    })
}