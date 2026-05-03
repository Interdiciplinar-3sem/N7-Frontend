import { useMutation } from "@tanstack/react-query"
import { authFecth } from "../authFetch"
import { API_URL } from "../api"
import type { RequestUpdateStudentType } from "../types/requestUpdateStudentType"
import type { ResponseUpdateStudentType } from "../types/responseUpdateStudent"

export const useUpdateStudent = (id: string) => {
    return useMutation({
        mutationKey: ["update-student", id], //preciso passar um dado unique aqui
        mutationFn: async (data: RequestUpdateStudentType) => {
            const response = await authFecth(`${API_URL}/${id}`, {
                body: JSON.stringify(data),
                method: "PUT"
            })

            if(response.status === 404){
                const erroBopdy = await response.json().catch(() => ({message: "Erro ao encontrar aluno"}))
                throw new Error(JSON.stringify({
                    status: 404,
                    message: erroBopdy.message ?? "Aluno não encontrado"
                }))
            }

            const contentType = response.headers.get("content-type") ?? ""

            if(contentType.includes("application/json")){
                return (await response.json()) as ResponseUpdateStudentType
            }

            const bodyResponse = await response.text()

            if(!bodyResponse.trim()){
                throw new Error("Não foi possivel atualizar o perfil - Resposta servidor vazia")
            }

            try {
                 return (await JSON.parse(bodyResponse)) as ResponseUpdateStudentType
            } catch (error) {
                console.log(error)
                throw new Error("Não foi possivel atualizar o perfil - Resposta servidor invalida")
            }
        }
    })
}