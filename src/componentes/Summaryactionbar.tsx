import { Heart, Flag, Star, ShieldOff, ShieldCheck } from "lucide-react";

type Role = "ALUNO" | "PROFESSOR" | "ADM";

export type SummaryActionBarProps = {
    id: number;
    role: Role | string;
    isActive?: boolean;
    isLiked?: boolean;
    hasBadge?: boolean;
    isProfessorBadge?: boolean;
    onReport?: (id: number) => void;
    onToggleLike?: (id: number) => void;
    onDesactive?: (id: number) => void;
    onAssignBadge?: (id: number, hasBadge: boolean) => void;
    showId?: boolean;
    className?: string;
    closeOnAction?: () => void;
};

export function SummaryActionBar({
    id,
    role,
    isActive,
    isLiked,
    hasBadge = false,
    isProfessorBadge = false,
    onReport,
    onToggleLike,
    onDesactive,
    onAssignBadge,
    showId = true,
    className = "",
}: SummaryActionBarProps) {
    const isAdm = role === "ADM";
    const isProfessor = role === "PROFESSOR";
    const isAluno = role === "ALUNO";

    const hasAnyAction =
        (isAluno && (onToggleLike || onReport)) ||
        (isProfessor && onAssignBadge) ||
        (isAdm && onDesactive);

    if (!hasAnyAction) return null;

    return (
        <div
            className={`flex items-center justify-between gap-3 border-t border-[#E8F1FB] bg-[#F8FBFF] px-5 py-3 sm:px-6 sm:py-4 shrink-0 ${className}`}
        >
            {showId && (
                <span className="text-[11px] text-slate-400 font-mono">ID #{id}</span>
            )}

            <div className="flex items-center gap-2 ml-auto">
                {isAluno && onToggleLike && (
                    <button
                        type="button"
                        onClick={() => onToggleLike(id)}
                        className={`
                            inline-flex items-center gap-1.5
                            rounded-full px-3 py-1.5
                            text-[12px] font-semibold transition
                            ${isLiked
                                ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                                : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-rose-50 hover:text-rose-500"
                            }
                        `}
                        title={isLiked ? "Descurtir" : "Curtir"}
                    >
                        <Heart size={13} className={isLiked ? "fill-rose-500" : ""} />
                        {isLiked ? "Curtido" : "Curtir"}
                    </button>
                )}

                {isAluno && onReport && (
                    <button
                        type="button"
                        onClick={async () => { onReport(id); }}
                        className="
                            inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
                            bg-white text-slate-500 ring-1 ring-slate-200
                            text-[12px] font-semibold
                            transition hover:bg-red-50 hover:text-red-500 hover:ring-red-200
                        "
                        title="Reportar resumo"
                    >
                        <Flag size={13} />
                        Reportar
                    </button>
                )}

                {isProfessor && onAssignBadge && (
                    <button
                        type="button"
                        onClick={async () => { onAssignBadge(id, hasBadge); }}
                        className={`
                            inline-flex items-center gap-1.5
                            rounded-full px-3 py-1.5
                            text-[12px] font-semibold transition
                            ${isProfessorBadge
                                ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-violet-50 hover:text-violet-600 hover:ring-violet-200"
                            }
                        `}
                        title={isProfessorBadge ? "Remover selo" : "Atribuir selo"}
                    >
                        <Star size={13} className={isProfessorBadge ? "fill-violet-500" : ""} />
                        {isProfessorBadge ? "Remover selo" : "Atribuir selo"}
                    </button>
                )}

                {isAdm && onDesactive && (
                    <button
                        type="button"
                        onClick={async () =>  onDesactive(id)}
                        className={`
                            inline-flex items-center gap-1.5
                            rounded-full px-3 py-1.5
                            text-[12px] font-semibold transition
                            ${isActive
                                ? "bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100"
                                : "bg-green-50 text-green-700 ring-1 ring-green-200 hover:bg-green-100"
                            }
                        `}
                        title={isActive ? "Desativar resumo" : "Ativar resumo"}
                    >
                        {isActive ? <ShieldOff size={13} /> : <ShieldCheck size={13} />}
                        {isActive ? "Desativar" : "Ativar"}
                    </button>
                )}
            </div>
        </div>
    );
}