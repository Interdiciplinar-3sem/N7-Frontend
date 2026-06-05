import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useConfirmEmail } from "../http/auth/useCreateStudentValited";

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
    }, [isSuccess]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70">
            <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl text-center">

                <div className="mb-8">
                    <span className="text-2xl font-bold text-white">Resumi</span>
                    <span className="text-2xl font-bold text-[#aac9f7]">FY</span>
                </div>

                {(!token || isError) && (
                    <EstadoErro
                        mensagem={!token ? "Link inválido. Nenhum token encontrado." : (error?.message ?? "Erro desconhecido.")}
                        onNavigate={() => navigate("/")}
                    />
                )}
                {isPending && <EstadoCarregando />}
                {isSuccess && <EstadoSucesso />}
            </div>
        </main>
    );
}

function EstadoCarregando() {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            <p className="text-white/80 text-sm">Confirmando sua conta...</p>
        </div>
    );
}

function EstadoSucesso() {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">Conta confirmada!</h2>
                <p className="text-white/70 text-sm mt-1">Redirecionando para o feed...</p>
            </div>
        </div>
    );
}

function EstadoErro({ mensagem, onNavigate }: { mensagem: string; onNavigate: () => void }) {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">Ops, algo deu errado</h2>
                <p className="text-white/70 text-sm mt-1">{mensagem}</p>
            </div>
            <button onClick={onNavigate}
                className="mt-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200">
                ← Voltar para o início
            </button>
        </div>
    );
}