import { useEffect, useState } from "react";
import { FormSignUp } from "../componentes/forms/formUserStudent";
import { useNavigate } from "react-router";
import { HomeIcon } from "lucide-react";
import { EmailConfirmationState } from "../componentes/forms/EmailConfirmationState";

export function PaginaCadastro() {
    const navigate = useNavigate();
    const [atual, setAtual] = useState(0);
    const [isEmailValid, setIsEmailValid] = useState<null | string>(null);

    const imagens = ["resumify.png", "login_img.png"];

    const handdleNavigate = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const intervalo = setInterval(() => {
            setAtual(prev => (prev + 1) % imagens.length);
        }, 5000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70 relative overflow-hidden">

            <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-white opacity-4" />
            <div className="absolute bottom-[-60px] left-[-40px] w-56 h-56 rounded-full bg-white opacity-3" />

            <div className="relative w-full max-w-4xl mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl">

                <section className="w-full flex items-center justify-between mb-10">
                    <div className="mb-8">
                        <span className="text-2xl font-bold text-white">Resumi</span>
                        <span className="text-2xl font-bold text-[#aac9f7]">FY</span>
                    </div>
                    <button className="hidden sm:block text-xs xxs:text-sm" onClick={() => handdleNavigate("/")}>
                        <HomeIcon className="text-white cursor-pointer w-5 h-5 inline-block mr-1 transition-colors duration-300 hover:text-[#aac9f7]" />
                    </button>
                </section>
                {isEmailValid && isEmailValid.length > 0 ? (
                    <EmailConfirmationState
                        email={isEmailValid}
                        onBack={() => handdleNavigate("/")}
                    />
                ) : (
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                                <img
                                    src={imagens[atual]}
                                    alt="Resumify"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex gap-2">
                                {imagens.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setAtual(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            i === atual ? "w-4 bg-white" : "w-1.5 bg-white/40"
                                        }`}
                                    />
                                ))}
                            </div>
                            
                            <div className="max-w-[220px] rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#aac9f7] mb-2">
                                    Cadastro de Professores
                                </p>

                                <p className="text-xs text-white/80 leading-relaxed">
                                    Professores interessados em criar uma conta devem solicitar acesso pelo e-mail:
                                </p>

                                <a
                                    href="mailto:jose.xavier.dev@gmail.com"
                                    className="mt-2 block text-sm font-medium text-[#aac9f7] hover:text-white transition-colors break-all"
                                >
                                    jose.xavier.dev@gmail.com
                                </a>

                                <p className="font-bold mt-3 text-[11px] text-yellow-300/60">
                                    O link de confirmação expira em até <span className="font-semibold text-yellow-300/80">2 dias</span>.
                                </p>
                            </div>

                        </div>
                        <div className="flex-1 w-full">
                            <FormSignUp setIsEmailValid={setIsEmailValid} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}