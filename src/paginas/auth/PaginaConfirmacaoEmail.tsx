import { useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ConfirmEmailError, useConfirmEmail } from "../../http/auth/useCreateStudentValited";
import { FeedbackCard, type EstadoFeedback } from "../../componentes/ui/FeedBackCard";

export function PaginaConfirmacaoEmail() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { mutate, isPending, isSuccess, isError, error } = useConfirmEmail(type);

    const ignorar = useRef(false);

    useEffect(() => {
        if (!token) return;

        ignorar.current = false;

        mutate(token, {
            onSuccess: () => {
                if (ignorar.current) return;
                setTimeout(() => navigate("/feed", { replace: true }), 2000);
            },
            onError: (err) => {
                if (ignorar.current) return;
                if (err instanceof ConfirmEmailError && err.status === 409) {
                    navigate("/feed", { replace: true });
                }
            },
        });

        return () => {
            ignorar.current = true;
        };
    }, [token]);

    const estado: EstadoFeedback = (() => {
        if (!token) {
            return { tipo: "erro", mensagem: "Link inválido. Nenhum token encontrado na URL." };
        }
        if (isPending) return { tipo: "carregando" };
        if (isSuccess) return { tipo: "sucesso" };
        if (isError) {
            if (error instanceof ConfirmEmailError) {
                if (error.status === 409) return { tipo: "carregando" };
                if (error.status === 410) return { tipo: "erro", mensagem: "Este link expirou. Faça o cadastro novamente para receber um novo e-mail." };
                if (error.status === 400) return { tipo: "erro", mensagem: "Link inválido. Solicite um novo cadastro." };
                if (error.status === 0)   return { tipo: "erro", mensagem: "Sem conexão com o servidor." };
                return { tipo: "erro", mensagem: error.message || "Erro ao confirmar conta." };
            }
            return { tipo: "erro", mensagem: "Erro inesperado ao confirmar conta." };
        }
        return { tipo: "carregando" };
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