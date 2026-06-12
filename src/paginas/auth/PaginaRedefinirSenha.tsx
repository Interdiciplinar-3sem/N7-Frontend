import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useRedefinirSenha } from "../../http/auth/usePasswordReset";

export function PaginaRedefinirSenha() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [senhaError, setSenhaError] = useState("");

    const { mutate, isPending, isSuccess, isError, error } = useRedefinirSenha();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSenhaError("");

        if (novaSenha.length < 6) {
            setSenhaError("A senha deve ter ao menos 6 caracteres.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setSenhaError("As senhas não coincidem.");
            return;
        }

        mutate({ token: token!, novaSenha }, {
            onSuccess: () => {
                setTimeout(() => navigate("/login", { replace: true }), 2500);
            },
        });
    };

    if (!token) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70">
                <div className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl text-center space-y-4">
                    <div className="text-5xl">⚠️</div>
                    <h2 className="text-xl font-semibold text-white">Link inválido</h2>
                    <p className="text-white/70 text-sm">Nenhum token encontrado na URL.</p>
                    <Link to="/esqueci-senha" className="inline-block text-sm text-[#aac9f7] hover:text-white underline transition-colors">
                        Solicitar novo link
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70">
            <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl text-center">
                <div className="mb-8">
                    <span className="text-2xl font-bold text-white">Resumi</span>
                    <span className="text-2xl font-bold text-[#aac9f7]">FY</span>
                </div>

                {isSuccess ? (
                    <div className="space-y-4">
                        <div className="text-5xl">✅</div>
                        <h2 className="text-xl font-semibold text-white">Senha redefinida!</h2>
                        <p className="text-white/80 text-sm">Redirecionando para o login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-white text-center mb-1">
                                Nova senha
                            </h2>
                            <p className="text-white/70 text-sm text-center">
                                Escolha uma senha segura para sua conta.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-white/80">Nova senha</label>
                            <input
                                type="password"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-white/80">Confirmar nova senha</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                placeholder="Repita a nova senha"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                            />
                        </div>

                        {(senhaError || isError) && (
                            <p className="text-red-300 text-sm text-center">
                                {senhaError || (error instanceof Error ? error.message : "Erro ao redefinir senha.")}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 rounded-xl bg-[#1A6FD4] hover:bg-[#1558a8] text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Salvando..." : "Salvar nova senha"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
