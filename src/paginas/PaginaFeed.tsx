import { useEffect, useRef, useState } from "react";
import { CardPerfil } from "../componentes/ui/cardPerfil";
import { CardResumo } from "../componentes/ui/cardResumo";
import { useOutletContext } from "react-router-dom";
import type { ContextPropsType } from "../types/contextPropsType";
import { useGetFeed, useGetRanking, useGetSummaryActivated } from "../http/feed/useGetFeed";
import { Link } from "react-router-dom";
import { ViewSummary } from "../componentes/ViewSummary";
import { useGetFollowingMe } from "../http/follow/useFollow";
import { useReportSummary, useUpdateStatusSummary } from "../http/summary/update/useUpdateSummary";
import { useAssignProfessorBadge, useRemoveProfessorBadge } from "../http/professor/useProfessor";
import { useSummaryActions } from "../hooks/useSummaryActionBar";
import { useLikeSummary } from "../http/likes/useLikeSummary";

export function PaginaFeed() {
    const parentContext = useOutletContext<ContextPropsType>();
    const isAluno = parentContext.role === "ALUNO" ? true : false;

    const [activeTab, setActiveTab] = useState<"explorar" | "seguindo" | "ranking">("explorar");
    
    const [selectedResumoId, setSelectedResumoId] = useState<number | null>(null);
    const { handleDesactiveSummary, handleReportSummary, handleBadge, handleLikeSummary } = useSummaryActions(setSelectedResumoId);
    const { mutateAsync: toggleLike } = useLikeSummary();

    const {
        data: resumosFeedPaged,
        fetchNextPage: fetchNextFeed,
        hasNextPage: hasNextFeed,
        isFetchingNextPage: isFetchingFeed,
    } = useGetFeed(parentContext.studentId);

    const {
        data: resumosExplorarPaged,
        fetchNextPage: fetchNextExplorar,
        hasNextPage: hasNextExplorar,
        isFetchingNextPage: isFetchingExplorar,
    } = useGetSummaryActivated();

    const {
        data: resumosRankingPaged,
        fetchNextPage: fetchNextRanking,
        hasNextPage: hasNextRanking,
        isFetchingNextPage: isFetchingRanking,
    } = useGetRanking();

    const { data: following } = useGetFollowingMe(parentContext.studentId);
    const followingList = following?.pages.flatMap(p => p.data) ?? [];
    const followingTotal = following?.pages[0]?.total ?? 0;

    const { mutateAsync: reportSummary } = useReportSummary();
    const { mutateAsync: toggleSummaryStatus } = useUpdateStatusSummary();
    const { mutateAsync: assignBadge } = useAssignProfessorBadge();
    const { mutateAsync: removeBadge } = useRemoveProfessorBadge();

    const role = parentContext.role;
    const isAdm = role === "ADM";
    const isProfessor = role === "PROFESSOR";

    const itemsPorAba = {
        explorar: resumosExplorarPaged?.pages.flatMap((p) => p.data) ?? [],
        seguindo: resumosFeedPaged?.pages.flatMap((p) => p.data) ?? [],
        ranking:  resumosRankingPaged?.pages.flatMap((p) => p.data) ?? [],
    };

    const items = itemsPorAba[activeTab];

    const fetchNextPage = {
        explorar: fetchNextExplorar,
        seguindo: fetchNextFeed,
        ranking:  fetchNextRanking,
    }[activeTab];

    const hasNextPage = {
        explorar: hasNextExplorar,
        seguindo: hasNextFeed,
        ranking:  hasNextRanking,
    }[activeTab];

    const isFetchingNextPage = {
        explorar: isFetchingExplorar,
        seguindo: isFetchingFeed,
        ranking:  isFetchingRanking,
    }[activeTab];

    const selectedResumo = items.find((r) => r.summaryId === selectedResumoId) ?? null;

    const sentinelaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage?.();
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

    const tabs = isProfessor
        ? (["explorar", "ranking"] as const)
        : (["explorar", "seguindo", "ranking"] as const);

    return (
        <main className="w-full h-full flex justify-around pt-16">
            <section className="lg:w-2/3 min-h-screen p-6 mb-20 sm:mb-0 flex flex-col">

                <div className="min-h-15 flex items-center justify-between mx-6 mb-6 bg-[#F8FAFC] shadow-lg rounded-lg">
                    <nav className="w-full">
                        <ul role="tablist" className="flex flex-col xs:flex-row gap-2 p-2 text-sm items-center">
                            {tabs.map((tab) => (
                                <li key={tab} role="presentation">
                                    <button
                                        onClick={() => setActiveTab(tab as typeof activeTab)}
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
                                    badge={resumo.badge}
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

                    {items.length > 0 && !hasNextPage && (
                        <div className="col-span-full text-center text-sm text-gray-400 py-4">
                            <h2>Você chegou ao fim.</h2>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="mt-2 px-4 py-2 bg-blue-600/90 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Subir até o topo
                            </button>
                        </div>
                    )}
                </section>

                {selectedResumoId !== null && (
                    <ViewSummary
                        id={selectedResumoId}
                        role={role}
                        studentId={parentContext.studentId}
                        onClose={() => setSelectedResumoId(null)}
                        isActive={selectedResumo?.ativo}
                        onToggleLike={isAluno ? (id, hasLiked) => handleLikeSummary(id, hasLiked, toggleLike) : undefined}
                        onReport={(id) => handleReportSummary(id, reportSummary)}
                        onSoftDeleteSumary={isAdm ? (id) => handleDesactiveSummary(id, toggleSummaryStatus) : undefined}
                        onAssignBadge={isProfessor
                            ? (id, hasBadge) => handleBadge(id, hasBadge, assignBadge, removeBadge)
                            : undefined
                        }
                    />
                )}
            </section>

            <section className="hidden min-w-72 xl:w-96 lg:flex lg:flex-col gap-3">
                {parentContext.role === "ALUNO" && (
                    <>
                        <div className="flex items-center justify-between gap-3">
                            <h2>Seguindo:</h2>
                        </div>

                        {followingList.map((s) => (
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

                        {followingTotal >= 10 && (
                            <div className="flex items-center justify-start gap-3">
                                <Link
                                    to="/feed/students"
                                    className="w-72 rounded-full border text-center border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                                >
                                    ver +
                                </Link>
                            </div>
                        )}
                    </>
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