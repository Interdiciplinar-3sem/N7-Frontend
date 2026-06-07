// src/http/auth/useCreateStudentValited.tsx
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api";

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

async function confirmEmail(token: string): Promise<{ message: string; token: string }> {
    const url = `${API_URL}/user/email?token=${encodeURIComponent(token)}`;

    if (!token) {
        throw new ConfirmEmailError(400, "TOKEN_VAZIO", "Token ausente — o link pode estar incompleto.");
    }

    let response: Response;
    try {
        response = await fetch(url, { method: "POST", credentials: "include" });
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

    return data as { message: string; token: string };
}

export function useConfirmEmail() {
    return useMutation({
        mutationFn: (token: string) => confirmEmail(token),
        retry: false,
    });
}