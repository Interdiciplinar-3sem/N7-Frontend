import { useState } from "react";
import { Link } from "react-router-dom";
import { useSolicitarRedefinicao } from "../../http/auth/usePasswordReset"; 

export function PaginaEsqueciSenha() {
    const [email, setEmail] = useState("");
    const { mutate, isPending, isSuccess, isError, error } = useSolicitarRedefinicao();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        mutate(email.trim());
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70">
            <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl text-center">
                <div className="mb-8">
                    <span className="text-2xl font-bold text-white">Resumi</span>
                    <span className="text-2xl font-bold text-[#aac9f7]">FY</span>
                </div>

                {isSuccess ? (
                    <div className="space-y-4">
                        <div className="text-5xl">📬</div>
                        <h2 className="text-xl font-semibold text-white">Email enviado!</h2>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha em breve.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block mt-4 text-sm text-[#aac9f7] hover:text-white underline transition-colors"
                        >
                            Voltar para o login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-white text-center mb-1">
                                Esqueceu sua senha?
                            </h2>
                            <p className="text-white/70 text-sm text-center leading-relaxed">
                                Informe seu email institucional e enviaremos um link para redefinição.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-white/80">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@aluno.cps.sp.gov.br"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                            />
                        </div>

                        {isError && (
                            <p className="text-red-300 text-sm text-center">
                                {error instanceof Error ? error.message : "Erro ao enviar email."}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 rounded-xl bg-[#1A6FD4] hover:bg-[#1558a8] text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Enviando..." : "Enviar link de redefinição"}
                        </button>

                        <Link
                            to="/login"
                            className="block text-center text-sm text-white/60 hover:text-white/90 transition-colors"
                        >
                            Voltar para o login
                        </Link>
                    </form>
                )}
            </div>
        </main>
    );
}
