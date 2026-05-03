import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface CardFormResumoProps {
    children: ReactNode;
}

export function CardFormResumo({children}: CardFormResumoProps) {
    const navigate = useNavigate();

    const handdleNavigate = () => {
        navigate("/criacao/resumo");
    };

    return (
        <section className="px-3 xs:px-6 pb-12">
            <div
                className="mb-4 xs:mb-0 mx-auto max-w-6xl rounded-3xl border border-[#DDEBFA] bg-white p-4 xs:p-6 sm:p-8 shadow-[0_20px_50px_rgba(76,154,228,0.16)] cursor-pointer"
                onClick={() => handdleNavigate()}
            >
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#22486E]">Crie o seu primeiro Resumo em 5 minutos</h2>
                    <p className="text-sm sm:text-base text-[#476B8D]">Preencha os campos abaixo, escolha o estilo e veja uma prévia do resumo antes de publicar.</p>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    {children}
                    <aside className="rounded-2xl border border-[#E9D97B] bg-[#FFF8C8] p-4 sm:p-5 space-y-3 h-fit">
                        <h3 className="font-semibold text-[#544300]">Preview</h3>
                        <div className="rounded-2xl bg-[#F4EB8C] p-4 shadow-sm">
                            <div className="pl-1 space-y-0.5">
                                <h4 className="font-semibold text-[#4F4307]">Titulo</h4>
                                <p className="text-sm text-[#5F5312]">Materia</p>
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-[#5F5312]">
                                <ChevronDown className="w-4 h-4" />
                                <span className="text-sm">0</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}