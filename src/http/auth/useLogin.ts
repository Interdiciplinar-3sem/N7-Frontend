import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestLoginType } from "../types/requestLoginType"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { ResponseLoginType } from "../types/responseLoginType"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({

        mutationKey: ["user-login"],
        mutationFn: async (data: RequestLoginType) => {
            const response = await authFecth(`${API_URL}/auth/login`,{
                method: "POST",
                body: JSON.stringify(data)
            })

            if(response.status === 401) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 401,
                    message: errorBody.message
                }));
            }

            if(response.status === 400) {
                const errorBody = await response.json();
                throw new Error(JSON.stringify({
                    status: 400,
                    message: errorBody.message
                }));
            }

            if(!response.ok){
                throw new Error("Erro ao tentar fazer login!");
            }

            const responseBody = await response.text();
            const result: ResponseLoginType = responseBody.trim()
                ? JSON.parse(responseBody)
                : { message: "Login realizado com sucesso", token: "" };

            return result;
        },
         onSuccess: async () => {
            queryClient.setQueryData(["user-auth"], {
                status: true,
            });

            await queryClient.invalidateQueries({ queryKey: ["user-auth"] });

            navigate("/feed", { replace: true})
        }
    })
}