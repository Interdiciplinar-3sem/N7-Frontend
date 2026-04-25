import {ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FormResumo() {
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
                    <form className="rounded-2xl bg-[#F6FAFF] p-4 sm:p-6 border border-[#D9E8F8] space-y-5">
                        <div className="space-y-2">
                            <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="titulo">Titulo</label>
                            <input
                                className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                type="text"
                                id="titulo"
                                placeholder="Defina um titulo"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="materia">Materia</label>
                                <input
                                    className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                    type="text"
                                    id="materia"
                                    placeholder="Atribua uma materia"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="tag">Tag</label>
                                <input
                                    className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                    type="text"
                                    id="tag"
                                    placeholder="Palavra"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="resumo">Resumo</label>
                            <textarea
                                className="w-full rounded-xl bg-white px-3 py-2.5 min-h-40 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                id="resumo"
                                placeholder="Digite aqui"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button type="button" className="bg-[#F7EBA1] flex items-center justify-between px-3 gap-4 min-w-28 rounded-xl py-2 text-sm font-medium text-[#554A12]">
                                <span>Cor</span>
                                <span>V</span>
                            </button>
                            <button type="button" className="bg-[#BDEBFF] flex items-center justify-between px-3 gap-4 min-w-36 rounded-xl py-2 text-sm font-medium text-[#12415C]">
                                <span>Publico</span>
                                <span>V</span>
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 pt-1">
                            <button type="reset" className="rounded-xl bg-[#9E1A1A] text-white px-4 py-2 text-sm font-semibold hover:brightness-95 transition">Reiniciar</button>
                            <button type="submit" className="rounded-xl bg-[#2E77C2] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition">Criar resumo</button>
                        </div>
                    </form>
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