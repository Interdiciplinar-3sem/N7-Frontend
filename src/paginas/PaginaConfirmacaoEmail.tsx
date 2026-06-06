import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useConfirmEmail } from "../http/auth/useCreateStudentValited";
import { FeedbackCard, type EstadoFeedback } from "../componentes/ui/FeedBackCard";

export function PaginaConfirmacaoEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { mutate, isPending, isSuccess, isError, error } = useConfirmEmail(token ?? "");

    useEffect(() => {
        if (token) mutate();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => navigate("/feed", { replace: true }), 2000);
        }

        if (error?.message === "Essa conta já foi confirmada.") {
            navigate("/feed", { replace: true });
        }
    }, [isSuccess, error]);

    const estado: EstadoFeedback = (() => {
        if (!token || isError) {
            return {
                tipo: "erro",
                mensagem: !token
                    ? "Link inválido. Nenhum token encontrado."
                    : (error?.message ?? "Erro desconhecido."),
            };
        }
        if (isPending) return { tipo: "carregando" };
        return { tipo: "sucesso" };
    })();

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70">
            <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl text-center">
                <div className="mb-8">
                    <span className="text-2xl font-bold text-white">Resumi</span>
                    <span className="text-2xl font-bold text-[#aac9f7]">FY</span>
                </div>
                <FeedbackCard estado={estado} onVoltar={() => navigate("/")} />
            </div>
        </main>
    );
}