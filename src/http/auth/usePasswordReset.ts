import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api";

async function solicitarRedefinicao(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/esqueci-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? "Erro ao solicitar redefinição.");
    }

    return data;
}

async function redefinirSenha(token: string, novaSenha: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/redefinir-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha }),
    });

    const data = await response.json();

    if (!response.ok) {
        const status = data.status ?? response.status;
        if (status === 410) throw new Error("O link expirou. Solicite um novo.");
        if (status === 400) throw new Error("Link inválido. Solicite um novo.");
        throw new Error(data.message ?? "Erro ao redefinir senha.");
    }

    return data;
}

export function useSolicitarRedefinicao() {
    return useMutation({
        mutationFn: (email: string) => solicitarRedefinicao(email),
        retry: false,
    });
}

export function useRedefinirSenha() {
    return useMutation({
        mutationFn: ({ token, novaSenha }: { token: string; novaSenha: string }) =>
            redefinirSenha(token, novaSenha),
        retry: false,
    });
}
