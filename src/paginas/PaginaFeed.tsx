import { useEffect, useRef, useState } from "react";
import { CardPerfil } from "../componentes/ui/cardPerfil";
import { CardResumo } from "../componentes/ui/cardResumo";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { ContextPropsType } from "../types/contextPropsType";
import { useGetFeed } from "../http/feed/useGetFeed";
import { useGetRanking } from "../http/feed/useGetRanking";
import { useGetFollowingMe } from "../http/follow/useGetFollowingMe";
import { Link } from "react-router-dom";
import { useGetSummaryActivated } from "../http/summary/useGetSummaryActivated";
import { ViweSummary } from "../componentes/ViweSummary";

export function PaginaFeed() {
    const navigate = useNavigate();
    const parentContext = useOutletContext<ContextPropsType>();

    useEffect(() => {
        if (parentContext.role === "ADM") {
            navigate("/painel", { replace: true });
        }
    }, [parentContext.role]);

    const [activeTab, setActiveTab] = useState<"explorar" | "seguindo" | "ranking">("explorar");
    const [selectedResumoId, setSelectedResumoId] = useState<number | null>(null);

    const {
        data: resumosFeedPaged,
        fetchNextPage: fetchNextFeed,
        hasNextPage: hasNextFeed,
        isFetchingNextPage: isFetchingFeed,
    } = useGetFeed(parentContext.studentId);
    
    const { data: resumosExplorarRaw } = useGetSummaryActivated();
    const { data: resumosRankingRaw } = useGetRanking(parentContext.studentId);

    const { data: following } = useGetFollowingMe(parentContext.studentId);

    const itemsPorAba = {
        explorar: resumosExplorarRaw ?? [],
        seguindo: resumosFeedPaged?.pages.flatMap((page) => page.data) ?? [],
        ranking:  resumosRankingRaw ?? [],
    };

    const items = itemsPorAba[activeTab];

    const sentinelaRef = useRef<HTMLDivElement>(null);

    const fetchNextPage    = activeTab === "seguindo" ? fetchNextFeed    : undefined;
    const hasNextPage      = activeTab === "seguindo" ? hasNextFeed      : false;
    const isFetchingNextPage = activeTab === "seguindo" ? isFetchingFeed : false;

    useEffect(() => {
        if (!fetchNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    console.log("Buscando próxima página do feed...");
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (sentinelaRef.current) observer.observe(sentinelaRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const emptyMessages = {
        explorar:  "Nosso sistema está vazio. Seja o primeiro a criar um resumo!",
        seguindo:  "Você não está seguindo ninguém ainda.",
        ranking:   "Ainda não há resumos suficientes para aparecer no ranking.",
    };

    return (
        <main className="w-full h-full flex justify-around pt-16">
            <section className="lg:w-2/3 min-h-screen p-6 mb-20 sm:mb-0 flex flex-col">

                <div className="min-h-15 flex items-center justify-between mx-6 mb-6 bg-[#F8FAFC] shadow-lg rounded-lg">
                    <nav className="w-full">
                        <ul role="tablist" className="flex flex-col xs:flex-row gap-2 p-2 text-sm items-center">
                            {(["explorar", "seguindo", "ranking"] as const).map((tab) => (
                                <li key={tab} role="presentation">
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        className={`${activeTab === tab && "bg-white shadow-sm"} px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 tracking-normal capitalize`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <section className="lg:w-full min-h-screen p-6 mb-20 sm:mb-0 sm:grid sm:grid-cols-2 flex flex-col sm:grid-flow-dense gap-8 grid-auto-rows-[180px]">
                    {items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400">
                            {emptyMessages[activeTab]}
                        </div>
                    ) : (
                        items.map((resumo, index) => {
                            let formato: "quadrado" | "horizontal" | "vertical" = "quadrado";
                            if (index % 5 === 0) formato = "horizontal";
                            if (index % 5 === 3) formato = "vertical";

                            const cores: ("verde" | "salmao" | "rosa" | "azul")[] = ["verde", "salmao", "rosa", "azul"];
                            const cor = cores[index % cores.length];

                            return (
                                <CardResumo
                                    key={resumo.summaryId}
                                    summaryId={resumo.summaryId}
                                    setViewSummary={setSelectedResumoId}
                                    titulo={resumo.titulo}
                                    texto={resumo.conteudo}
                                    formato={formato}
                                    cor={cor}
                                    imageUrl={resumo.studentUrl}
                                    studentName={resumo.studentNome}
                                    curtidas={resumo.totalCurtidas}
                                />
                            );
                        })
                    )}

                    {items.length > 0 && items.length < 6 &&
                        Array.from({ length: 6 - items.length }).map((_, i) => {
                            const index = items.length + i;
                            let formato: "quadrado" | "horizontal" | "vertical" = "quadrado";
                            if (index % 5 === 0) formato = "horizontal";
                            if (index % 5 === 3) formato = "vertical";

                            return (
                                <CardResumo
                                    key={`ph-${i}`}
                                    summaryId={i}
                                    setViewSummary={setSelectedResumoId}
                                    titulo=""
                                    texto=""
                                    formato={formato}
                                    cor={"invisivel" as any}
                                    invisivel={true}
                                    imageUrl=""
                                    studentName=""
                                />
                            );
                        })
                    }

                    <div ref={sentinelaRef} className="h-4 col-span-full" />

                    {isFetchingNextPage && (
                        <div className="col-span-full text-center text-sm text-gray-400 py-4">
                            Carregando mais...
                        </div>
                    )}
                    {!hasNextPage && activeTab === "seguindo" && (
                        <div className="col-span-full text-center text-sm text-gray-400 py-4">
                            <h2>Você chegou ao fim do feed.</h2>
                            <button 
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className="mt-2 px-4 py-2 bg-blue-600/90 text-white rounded-md hover:bg-blue-700 transition"
                            >
                              Subir até o topo
                           </button>
                        </div>
                    )}
                </section>

                {selectedResumoId && (
                    <ViweSummary
                        id={selectedResumoId}
                        onClose={() => setSelectedResumoId(null)}
                    />
                )}
            </section>

            <section className="hidden min-w-72 xl:w-96 lg:flex lg:flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <h2>Seguindo:</h2>
                </div>

                {following?.map((s: any) => (
                    <CardPerfil
                        key={s.studentId}
                        studentId={s.studentId}
                        className=""
                        nome={s.name}
                        seguidores={s.seguidores}
                        semestre={s.semestre}
                        url={s.studentUrl}
                    />
                ))}

                {following && following.length >= 10 && (
                    <div className="flex items-center justify-start gap-3">
                        <Link
                            to="/feed/students"
                            className="w-72 rounded-full border text-center border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                            ver +
                        </Link>
                    </div>
                )}

                <div className="min-h-20 min-w-20 relative z-51 flex gap-1 text-xs">
                    <a className="hover:underline" href="#">Sobre</a>
                    <h2>.</h2>
                    <a className="hover:underline">Ajuda</a>
                    <a className="hover:underline" href="#">Contato</a>
                    <h2>.</h2>
                    <a className="hover:underline">API</a>
                    <a className="hover:underline" href="#">Termos</a>
                    <h2>.</h2>
                    <a className="hover:underline">Privacidade</a>
                </div>
            </section>
        </main>
    );
}