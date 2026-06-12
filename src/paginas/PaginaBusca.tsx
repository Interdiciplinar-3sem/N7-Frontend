import { useEffect, useRef, useState } from "react";
import { X, Search, SlidersHorizontal, ChevronUp } from "lucide-react";
import { useNavigate, useSearchParams, useOutletContext } from "react-router-dom";
import { CardResumo } from "../componentes/ui/cardResumo";
import { ViewSummary } from "../componentes/ViewSummary";
import { useSearchSummaries } from "../http/feed/useGetFeed";
import { useGetAllSubjects } from "../http/subject/useSubjects";
import { useGetAllTags } from "../http/tags/get/useGetTags";
import { useReportSummary, useUpdateStatusSummary } from "../http/summary/update/useUpdateSummary";
import { useAssignProfessorBadge, useRemoveProfessorBadge } from "../http/professor/useProfessor";
import { useSummaryActions } from "../hooks/useSummaryActionBar";
import type { ContextPropsType } from "../types/contextPropsType";

const SEMESTRES = [1, 2, 3, 4, 5, 6];

export function PaginaBusca() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const parentContext = useOutletContext<ContextPropsType>();

    const qParam       = searchParams.get("q") ?? "";
    const subjectParam = Number(searchParams.get("subjectId") ?? 0);
    const tagParam     = Number(searchParams.get("tagId") ?? 0);
    const semestreParam = Number(searchParams.get("semestre") ?? 0);

    const [inputValue, setInputValue]       = useState(qParam);
    const [busca, setBusca]                 = useState(qParam);
    const [subjectId, setSubjectId]         = useState(subjectParam);
    const [tagId, setTagId]                 = useState(tagParam);
    const [semestre, setSemestre]           = useState(semestreParam);
    const [showFilters, setShowFilters]     = useState(false);
    const [selectedResumoId, setSelectedResumoId] = useState<number | null>(null);

    const { data: subjects } = useGetAllSubjects();
    const { data: tags }     = useGetAllTags();

    const { mutateAsync: reportSummary }      = useReportSummary();
    const { mutateAsync: toggleSummaryStatus } = useUpdateStatusSummary();
    const { mutateAsync: assignBadge }        = useAssignProfessorBadge();
    const { mutateAsync: removeBadge }        = useRemoveProfessorBadge();
    const { handleDesactiveSummary, handleReportSummary, handleBadge } = useSummaryActions(setSelectedResumoId);

    const role       = parentContext?.role ?? "";
    const isAdm      = role === "ADM";
    const isProfessor = role === "PROFESSOR";

    const {
        data: resultados,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useSearchSummaries({
        busca,
        subjectId: subjectId || undefined,
        tagId: tagId || undefined,
        semestre: semestre || undefined,
    });

    const items = resultados?.pages.flatMap((p) => p.data) ?? [];
    const temFiltroAtivo = !!(busca || subjectId || tagId || semestre);

    const sentinelaRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
            },
            { threshold: 0.1 }
        );
        if (sentinelaRef.current) observer.observe(sentinelaRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        if (qParam) { setInputValue(qParam); setBusca(qParam); }
    }, [qParam]);

    const buildParams = (overrides: Record<string, string | number>) => {
        const base: Record<string, string> = {};
        const merged = { q: busca, subjectId, tagId, semestre, ...overrides };
        if (merged.q)        base.q         = String(merged.q);
        if (merged.subjectId) base.subjectId = String(merged.subjectId);
        if (merged.tagId)    base.tagId     = String(merged.tagId);
        if (merged.semestre) base.semestre  = String(merged.semestre);
        return base;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const novosBusca = inputValue.trim();
        setBusca(novosBusca);
        setSearchParams(buildParams({ q: novosBusca }));
    };

    const handleSubjectChange = (value: number) => {
        setSubjectId(value);
        setSearchParams(buildParams({ subjectId: value }));
    };

    const handleTagChange = (value: number) => {
        setTagId(value);
        setSearchParams(buildParams({ tagId: value }));
    };

    const handleSemestreChange = (value: number) => {
        const next = semestre === value ? 0 : value;
        setSemestre(next);
        setSearchParams(buildParams({ semestre: next }));
    };

    const limparFiltros = () => {
        setInputValue(""); setBusca(""); setSubjectId(0); setTagId(0); setSemestre(0);
        setSearchParams({});
    };

    const selectedResumo = items.find((r) => r.summaryId === selectedResumoId) ?? null;

    const subjectsFiltrados = semestre
        ? (subjects ?? []).filter(s => s.semestre === semestre)
        : (subjects ?? []);

    return (
        <main className="min-h-screen w-full bg-gradient-to-b from-white via-[#F6F9FF] to-[#EAF1FF] px-4 py-6 flex flex-col items-center">

            <section className="relative w-full max-w-2xl rounded-2xl border border-black/5 bg-white/90 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Voltar"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-black/70 transition hover:bg-black/5 hover:text-black"
                >
                    <X className="h-5 w-5" />
                </button>

                <form className="mt-8 flex gap-2" onSubmit={handleSearch}>
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30 pointer-events-none" />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Pesquisar por título ou autor..."
                            className="w-full rounded-xl border border-black/10 bg-[#F8F8F6] pl-9 pr-4 py-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#4C9AE4] focus:ring-2 focus:ring-[#4C9AE4]/20"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition border ${showFilters || subjectId || tagId || semestre ? "bg-[#DAE8FF] border-[#4C9AE4] text-[#2E77C2]" : "bg-white border-black/10 text-black/60 hover:bg-[#F0F7FF]"}`}
                        aria-label="Filtros"
                    >
                        {showFilters
                            ? <ChevronUp className="h-4 w-4" />
                            : <SlidersHorizontal className="h-4 w-4" />
                        }
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-[#4C9AE4] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4C9AE4]/30 transition hover:brightness-95 active:scale-[0.98]"
                    >
                        Buscar
                    </button>
                </form>

                {showFilters && (
                    <div className="mt-4 flex flex-col gap-4">
                        <div>
                            <p className="text-xs font-semibold text-black/50 mb-2 uppercase tracking-wide">Semestre</p>
                            <div className="flex flex-wrap gap-2">
                                {SEMESTRES.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => handleSemestreChange(s)}
                                        className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                                            semestre === s
                                                ? "bg-[#2E77C2] border-[#2E77C2] text-white"
                                                : "bg-white border-black/10 text-black/60 hover:bg-[#F0F7FF] hover:border-[#4C9AE4]"
                                        }`}
                                    >
                                        {s}º sem
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-black/50 mb-2 uppercase tracking-wide">Tags</p>
                            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
                                {(tags ?? []).map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => handleTagChange(tagId === t.id ? 0 : t.id)}
                                        className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                                            tagId === t.id
                                                ? "bg-[#2E77C2] border-[#2E77C2] text-white"
                                                : "bg-white border-black/10 text-black/60 hover:bg-[#F0F7FF] hover:border-[#4C9AE4]"
                                        }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-black/50 mb-2 uppercase tracking-wide">
                                Matéria{semestre ? ` — ${semestre}º semestre` : ""}
                            </p>
                            <select
                                value={subjectId}
                                onChange={(e) => handleSubjectChange(Number(e.target.value))}
                                className="w-full rounded-xl border border-black/10 bg-[#F8F8F6] px-3 py-2 text-sm text-black outline-none focus:border-[#4C9AE4] focus:ring-2 focus:ring-[#4C9AE4]/20"
                            >
                                <option value={0}>Todas as matérias</option>
                                {subjectsFiltrados.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {temFiltroAtivo && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {busca && (
                            <span className="flex items-center gap-1 rounded-full bg-[#EAF1FF] border border-[#4C9AE4]/30 px-3 py-1 text-xs text-[#2E77C2]">
                                "{busca}"
                                <button onClick={() => { setBusca(""); setInputValue(""); setSearchParams(buildParams({ q: "" })); }}>
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {semestre > 0 && (
                            <span className="flex items-center gap-1 rounded-full bg-[#EAF1FF] border border-[#4C9AE4]/30 px-3 py-1 text-xs text-[#2E77C2]">
                                {semestre}º sem
                                <button onClick={() => handleSemestreChange(semestre)}>
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {tagId > 0 && (
                            <span className="flex items-center gap-1 rounded-full bg-[#EAF1FF] border border-[#4C9AE4]/30 px-3 py-1 text-xs text-[#2E77C2]">
                                {tags?.find(t => t.id === tagId)?.name ?? "tag"}
                                <button onClick={() => handleTagChange(0)}>
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {subjectId > 0 && (
                            <span className="flex items-center gap-1 rounded-full bg-[#EAF1FF] border border-[#4C9AE4]/30 px-3 py-1 text-xs text-[#2E77C2]">
                                {subjects?.find(s => s.id === subjectId)?.name ?? "matéria"}
                                <button onClick={() => handleSubjectChange(0)}>
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={limparFiltros}
                            className="ml-auto text-xs text-black/40 hover:text-[#2E77C2] hover:underline transition"
                        >
                            Limpar tudo
                        </button>
                    </div>
                )}
            </section>

            <section className="w-full max-w-2xl mt-4 flex flex-col gap-3">
                    {isPending && (
                        <p className="text-center text-sm text-black/50 py-6">Buscando...</p>
                    )}

                    {!isPending && items.length === 0 && (
                        <p className="text-center text-sm text-black/50 py-6">
                            Nenhum resumo encontrado{busca ? ` para "${busca}"` : ""}.
                        </p>
                    )}

                    {items.map((resumo, index) => {
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
                                badge={resumo.badge}
                                setViewSummary={setSelectedResumoId}
                            />
                        );
                    })}

                    <div ref={sentinelaRef} className="h-4" />

                    {isFetchingNextPage && (
                        <p className="text-center text-sm text-black/50 py-4">Carregando mais...</p>
                    )}

                    {items.length > 0 && !hasNextPage && (
                        <p className="text-center text-sm text-black/40 py-4">Fim dos resultados.</p>
                    )}
                </section>

            {selectedResumoId !== null && (
                <ViewSummary
                    id={selectedResumoId}
                    studentId={parentContext.studentId!}
                    role={role}
                    onClose={() => setSelectedResumoId(null)}
                    isActive={selectedResumo?.ativo}
                    onReport={!isAdm ? (id) => handleReportSummary(id, reportSummary) : undefined}
                    onSoftDeleteSumary={isAdm ? (id) => handleDesactiveSummary(id, toggleSummaryStatus) : undefined}
                    onAssignBadge={isProfessor
                        ? (id, hasBadge) => handleBadge(id, hasBadge, assignBadge, removeBadge)
                        : undefined
                    }
                />
            )}
        </main>
    );
}