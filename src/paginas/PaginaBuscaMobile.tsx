import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardResumo } from "../componentes/ui/cardResumo";
import { useGetAllSummary } from "../http/summary/get/useGetSummary";

export function PaginaBuscaMobile() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { data: resumos, isPending } = useGetAllSummary();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchTerm(inputValue);
    };

    return (
        <main className="min-h-screen w-screen overflow-x-hidden bg-linear-to-b from-white via-[#F6F9FF] to-[#EAF1FF] px-4 py-6 flex flex-col items-center">
            <section className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white/90 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Cancelar busca"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-black/70 transition hover:bg-black/5 hover:text-black"
                >
                    <X className="h-5 w-5" />
                </button>

                <form className="mt-8 flex gap-2" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Pesquisar por título ou autor..."
                        className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#F8F8F6] px-4 py-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#4C9AE4] focus:ring-2 focus:ring-[#4C9AE4]/20"
                    />
                    <button
                        type="submit"
                        className="rounded-xl bg-[#4C9AE4] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4C9AE4]/30 transition hover:brightness-95 active:scale-[0.98]"
                    >
                        Buscar
                    </button>
                </form>
            </section>

            {searchTerm && (
                <section className="w-full max-w-md mt-4 flex flex-col gap-3">
                    {isPending && <p className="text-center text-sm text-black/50">Buscando...</p>}
                    {!isPending && resumos?.length === 0 && (
                        <p className="text-center text-sm text-black/50">Nenhum resumo encontrado para "{searchTerm}".</p>
                    )}
                    {resumos?.map((resumo, index) => {
                        const cores: ("verde" | "salmao" | "rosa" | "azul")[] = ["verde", "salmao", "rosa", "azul"];
                        return (
                            <CardResumo
                                key={resumo.summaryId}
                                summaryId={resumo.summaryId}
                                titulo={resumo.titulo}
                                texto={resumo.conteudo}
                                formato="horizontal"
                                cor={cores[index % cores.length]}
                                imageUrl={resumo.studentUrl}
                                studentName={resumo.studentNome}
                                curtidas={resumo.totalCurtidas}
                                setViewSummary={(id) => navigate(`/resumo/${id}`)}
                            />
                        );
                    })}
                </section>
            )}
        </main>
    );
}