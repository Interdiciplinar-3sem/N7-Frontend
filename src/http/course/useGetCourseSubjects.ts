import { useQuery } from "@tanstack/react-query";
import { authFecth } from "../authFetch";
import type { ResponseGetCourseSubjectsType } from "../types/responseGetCourseSubjects";
import { API_URL } from "../api";

export const useGetCourseSubjects = (courseId: string) => {
    return useQuery({
        queryKey: ["courseSubjects", courseId],
        queryFn: async () => {
            const response = await authFecth(`${API_URL}/courses/${courseId}/subjects`);
            
            if(!response.ok){
                throw new Error("Erro ao buscar resumo!");
            }

            const responseBody = await response.text();
            const result: ResponseGetCourseSubjectsType[] = responseBody.trim()
                ? JSON.parse(responseBody) : [{ message: "Sucesso ao buscar resumo!" }];

            return result;


        }
    })
}