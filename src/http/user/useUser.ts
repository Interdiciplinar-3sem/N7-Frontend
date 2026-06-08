import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api"
import { request } from "../httpClient"
import type { ResponseGetUserType } from "./types/ResponseGetUserType" 


export const useGetUser = () => {
    return useQuery({
        queryKey: ["get-users"],
        queryFn: () => request<ResponseGetUserType[]>(`${API_URL}/user`),
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}

export const useGetUserDesactivated = () => {
    return useQuery({
        queryKey: ["get-users-desactivated"],
        queryFn: () => request<ResponseGetUserType[]>(`${API_URL}/user/desativados`),
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}