import { useEffect, useState } from "react";
import { Link } from "react-router";

export function PaginaCadastro() {
    const [atual, setAtual] = useState(0);
    const imagens = ["login_img_xl.png", "login_img.png"];
    useEffect(() => {
        const intervalo = setInterval(() => {
            setAtual(prev => (prev + 1) % imagens.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    return (
       
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a6e] via-[#2d5be3] to-[#7ab3f0] relative overflow-hidden">

        
            <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-white opacity-10 pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[-40px] w-56 h-56 rounded-full bg-white opacity-10 pointer-events-none" />

       
      
            <div className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl">

                <div className="mb-8">
                    <span className="text-2xl font-bold tracking-tight text-white">Resumi</span>
                    <span className="text-2xl font-bold tracking-tight text-[#aac9f7]">FY</span>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center">

                    {/*
            * carrossel
          */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full">
                        <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                            <img
                                key={atual}
                                src={imagens[atual]}
                                alt="Ilustração do Resumify"
                                className="w-full h-full object-cover fade-in"
                            />
                        </div>

                        {/*
              * bolinhas carrossel
            */}
                        <div className="flex gap-2">
                            {imagens.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setAtual(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === atual ? "w-4 bg-white" : "w-1.5 bg-white/40"
                                        }`}
                                    aria-label={`Ir para imagem ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* formulario */}
                    <div className="flex-1 w-full">
                        <h1 className="text-2xl font-semibold text-white mb-6">Criar conta</h1>

                        <form className="space-y-4">

                            {/* E-mail */}
                            <div>
                                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                                    E-mail
                                </label>
                                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                                    <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                    />
                                </div>
                            </div>

                            {/* Nome de usuário */}
                            <div>
                                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                                    Nome de usuário
                                </label>
                                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                                    <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="seu_usuario"
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                    />
                                </div>
                            </div>

                            {/* Senha */}
                            <div>
                                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                                    Senha
                                </label>
                                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                                    <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                    />
                                </div>
                            </div>

                            {/* Confirmar senha */}
                            <div>
                                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                                    Confirmar senha
                                </label>
                                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                                    <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-[#2d5be3] font-bold text-sm py-3.5 rounded-xl mt-2
                           hover:bg-white/90 active:scale-[0.98] transition-all duration-200 shadow-lg"
                            >
                                Cadastrar-se
                            </button>

                            {/* Link para login */}
                            <p className="text-center text-xs text-white/50 pt-1">
                                Já tem uma conta?{" "}
                                <Link to="/login" className="text-[#aac9f7] font-semibold hover:text-white transition-colors">
                                    Entrar
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}