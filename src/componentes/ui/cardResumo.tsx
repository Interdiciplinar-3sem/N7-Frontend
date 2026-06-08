import { Flag, Heart, ShieldOff, Star } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants"
import { SummaryBadge } from "../badge/SummaryBadge";
import type { SummaryBadgeType } from "../../http/summary/types/ResponseGetSummaryType";

const cardStyle = tv({
    base: "group relative z-51 flex flex-col overflow-hidden rounded-3xl border border-white/60 p-5 sm:p-6 text-slate-900 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_-18px_rgba(15,23,42,0.55)]",
    variants: {
        formato: {
            quadrado: "col-span-1 row-span-1",
            horizontal: 'col-span-2 row-span-1',
            vertical: 'col-span-1 row-span-2',
        },
        cor: {
            verde: 'bg-[#D8FBE4]',
            salmao: 'bg-[#FFE6E0]',
            rosa: 'bg-[#FFE2F4]',
            azul: 'bg-[#DAE8FF]',
            invisivel: 'bg-transparent border-transparent shadow-none pointer-events-none opacity-0',
        },
        invisivel: {
            true: "border-transparent bg-transparent shadow-none pointer-events-none opacity-0",
        }
    },
    defaultVariants: {
        formato: "quadrado",
    }
})


type CardProps = VariantProps<typeof cardStyle> & {
    summaryId: number;
    titulo: string;
    texto: string;
    imageUrl?: string;
    studentName?: string;
    className?: string;
    curtidas?: number;
    badge?: SummaryBadgeType | null;
    setViewSummary?: (id: number) => void;
    isAdm?: boolean;
    isProfessor?: boolean;
    isActive?: boolean;
    onReport?: (id: number) => void;
    onToggleStatus?: (id: number) => void;
    onAssignBadge?: (id: number) => void;
}

export function CardResumo({summaryId, titulo, texto, imageUrl, studentName, className, formato, cor, curtidas, badge, setViewSummary, isAdm, isProfessor, isActive, onReport, onToggleStatus, onAssignBadge }: CardProps) {
    const isVertical = formato === "vertical";
    const hasBadge = !!badge;
    const isProfessorBadge = badge?.name?.toLowerCase().includes("professor");

    return (
        <div onClick={() => setViewSummary && setViewSummary(summaryId)} className={cardStyle({formato, cor, className})}>

            <div className={`relative flex h-full flex-col ${isVertical ? "gap-4" : "justify-between"}`}>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-700">
                            resumo
                        </span>
                        {hasBadge && (
                            <SummaryBadge
                                name={badge!.name}
                                type={isProfessorBadge ? "professor" : "turma"}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-white"
                            aria-label="Curtir resumo"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Heart size={16} className="group-hover:scale-110 transition-transform" />
                            <span>{curtidas ?? 0}</span>
                        </button>
                    </div>
                </div>

                <h2 className={`mt-3 line-clamp-2 font-semibold leading-tight text-slate-900 ${isVertical ? "text-[1.45rem]" : "text-[1.35rem]"}`}>
                    {titulo}
                </h2>

                <p className={`${isVertical ? "line-clamp-10" : "line-clamp-4"} mt-2 text-sm leading-relaxed text-slate-700 sm:text-[15px]`}>
                    {texto}
                </p>
            </div>

            <div className={`relative w-full min-h-10 ${isVertical ? "mt-5" : "mt-4"}`}>
                <hr className="border-slate-800/15" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div
                                className="min-w-10 min-h-10 rounded-full bg-cover bg-center bg-zinc-300 pointer-events-none"
                                style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
                            />
                            <span className="font-medium">{studentName || "usuario"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="rounded-md bg-white/60 px-2 py-1 text-xs font-semibold text-slate-800">
                            leitura rapida
                        </span>

                        {/* Botão de report — visível para alunos */}
                        {onReport && !isAdm && !isProfessor && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onReport(summaryId); }}
                                className="rounded-full bg-white/70 p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-500 transition"
                                title="Reportar resumo"
                                aria-label="Reportar resumo"
                            >
                                <Flag size={13} />
                            </button>
                        )}

                        {/* Botão de desativar — visível para ADM */}
                        {isAdm && onToggleStatus && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleStatus(summaryId); }}
                                className={`rounded-full p-1.5 transition ${isActive ? "bg-white/70 text-red-500 hover:bg-red-50" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
                                title={isActive ? "Desativar resumo" : "Ativar resumo"}
                                aria-label="Alternar status do resumo"
                            >
                                <ShieldOff size={13} />
                            </button>
                        )}

                        {/* Botão de atribuir selo — visível para Professor */}
                        {isProfessor && onAssignBadge && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onAssignBadge(summaryId); }}
                                className={`rounded-full p-1.5 transition ${isProfessorBadge ? "bg-violet-100 text-violet-600 hover:bg-violet-200" : "bg-white/70 text-slate-500 hover:bg-violet-50 hover:text-violet-500"}`}
                                title={isProfessorBadge ? "Remover selo do professor" : "Atribuir selo do professor"}
                                aria-label="Atribuir selo do professor"
                            >
                                <Star size={13} className={isProfessorBadge ? "fill-violet-500" : ""} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}