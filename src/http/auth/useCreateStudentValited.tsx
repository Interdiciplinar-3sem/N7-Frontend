import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api";
import { checkCookies } from "../../hooks/useCheckCookies";
import { authFecth } from "../authFetch"; 

export class ConfirmEmailError extends Error {
    readonly status: number;
    readonly code: string;

    constructor(status: number, code: string, message: string) {
        super(message);
        this.name = "ConfirmEmailError";
        this.status = status;
        this.code = code;
    }
}

async function confirmEmail(token: string, type?: string): Promise<{
    message: string;
    token: string;
    status: boolean;
    id: number;
    studentId: number | null;
    professorId: number | null;
    role: string;
}> {
    const url = type === "professor"
        ? `${API_URL}/adm/professor?token=${encodeURIComponent(token)}`
        : `${API_URL}/user/email?token=${encodeURIComponent(token)}`;

    if (!token) {
        throw new ConfirmEmailError(400, "TOKEN_VAZIO", "Token ausente — o link pode estar incompleto.");
    }

    let response: Response;
    try {
        response = await authFecth(url, { method: "POST" });
    } catch {
        throw new ConfirmEmailError(0, "NETWORK_ERROR", "Não foi possível conectar ao servidor.");
    }

    const contentType = response.headers.get("content-type") ?? "";
    let data: { status?: number; code?: string; message?: string } = {};

    if (contentType.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            throw new ConfirmEmailError(response.status, "PARSE_ERROR", `Resposta inválida do servidor (HTTP ${response.status}).`);
        }
    } else {
        const rawText = await response.text();
        throw new ConfirmEmailError(response.status, "NON_JSON_RESPONSE", `Resposta inesperada do servidor (HTTP ${response.status}, tipo: ${contentType || rawText.slice(0, 80)}).`);
    }

    if (!response.ok) {
        throw new ConfirmEmailError(data.status ?? response.status, data.code ?? "UNKNOWN", data.message ?? "Erro ao confirmar email.");
    }

    return data as unknown as { message: string; token: string; status: boolean; id: number; studentId: number | null; professorId: number | null; role: string };
}

export function useConfirmEmail(type?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (token: string) => confirmEmail(token, type),
        retry: false,
        onSuccess: (data) => {
            const cookiesWork = checkCookies();
            if (!cookiesWork && data.token) {
                localStorage.setItem("accessToken", data.token);
            }
            queryClient.setQueryData(["user-auth"], {
                status: data.status,
                id: data.id,
                studentId: data.studentId,
                professorId: data.professorId,
                role: data.role,
            });
        },
    });
}