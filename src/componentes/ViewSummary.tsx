import { useEffect } from "react"
import { Overlay } from "./overlay"
import {
    Expand, GraduationCap, Heart, X
} from "lucide-react"
import { useNavigate } from "react-router"
import { EditorContent } from "@tiptap/react"
import { useSummaryEditor } from "../hooks/useEditorHook"
import { SummaryBadge } from "./badge/SummaryBadge"
import { useGetSummaryId, useGetLikedSummaryIds } from "../http/summary/get/useGetSummary"
import { StudentPreviewProfile } from "./previwer/studentPreviewProfile"
import { SummaryActionBar } from "./Summaryactionbar"

type Role = "ALUNO" | "PROFESSOR" | "ADM"

type ViewSummaryProps = {
    id: number
    studentId: number
    role: Role | string
    onClose: () => void
    materia?: string
    isActive?: boolean
    isLiked?: boolean
    onReport?: (id: number) => void
    onSoftDeleteSumary?: (id: number) => void
    onToggleLike?: (id: number, hasLiked: boolean) => void
    onAssignBadge?: (id: number, hasBadge: boolean) => void
}

export const ViewSummary = ({
    id,
    role,
    studentId,
    onClose,
    materia,
    isActive,
    isLiked: isLikedProp,
    onReport,
    onToggleLike,
    onSoftDeleteSumary,
    onAssignBadge,
}: ViewSummaryProps) => {
    const isAdm = role === "ADM"
    const isAluno = role === "ALUNO"
    const { data, isPending, isError } = useGetSummaryId(id)

    const { data: likedIds } = useGetLikedSummaryIds()
    const isLiked = isLikedProp !== undefined
        ? isLikedProp
        : (likedIds?.has(id) ?? false)

    const isOwner = role === "ALUNO" && studentId === data?.studentId

    const hasBadge = !!data?.badge
    const isProfessorBadge = data?.badge?.name?.toLowerCase().includes("professor")

    const materiaNome = materia ?? data?.subjectNome ?? "Matéria não informada"
    const navigate = useNavigate()
    const editor = useSummaryEditor()

    useEffect(() => {
        if (data?.conteudo && editor) {
            editor.commands.setContent(data.conteudo)
            editor.setEditable(false)
        }
    }, [data, editor])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <>
            <Overlay onClose={onClose} />

            <div className="
                fixed z-100
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[96vw] max-w-3xl
                max-h-[92vh] sm:max-h-[88vh]
                flex flex-col
                overflow-hidden
                rounded-2xl sm:rounded-3xl
                border border-[#D9E8F8]
                bg-white
                shadow-[0_24px_64px_rgba(15,23,42,0.18)]
            ">
                <header className="
                    flex items-start justify-between gap-3
                    border-b border-[#D9E8F8] bg-[#F4F9FF]
                    px-5 py-4 sm:px-6 sm:py-5
                    shrink-0
                ">
                    <div className="flex flex-col gap-1.5 min-w-0 w-full">
                        <button
                            type="button"
                            onClick={() => navigate(`/resumo/${id}`)}
                            className="
                                self-start inline-flex items-center gap-1.5
                                rounded-md border border-[#D0E6F8] bg-white
                                px-2.5 py-1 text-[11px] font-semibold text-[#2E6EA8]
                                transition hover:bg-[#EAF4FF]
                            "
                        >
                            <Expand className="h-3 w-3" />
                            Tela cheia
                        </button>

                        <h2 className="
                            text-xl font-bold text-[#1B4F86] leading-snug sm:text-2xl
                            w-full
                        ">
                            {isPending ? "Carregando..." : (data?.titulo ?? "Resumo")}
                        </h2>

                        <StudentPreviewProfile
                            studentNome={data?.studentNome || "Desconecido"}
                            studentUrl={data?.studentUrl}
                            studentId={data?.studentId}
                            handleGoToProfile={() => navigate(`/perfil/${data?.studentId}`)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            shrink-0 rounded-full border border-[#D9E8F8] bg-white
                            p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800
                        "
                        aria-label="Fechar"
                    >
                        <X size={16} />
                    </button>
                </header>

                {!isPending && !isError && (
                    <div className="
                        grid grid-cols-2 sm:grid-cols-4 gap-2
                        border-b border-[#EBF3FC] bg-white
                        px-5 py-3 sm:px-6
                        shrink-0
                    ">
                        <span className="
                            gap-1.5 rounded-full
                            bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-600
                            ring-1 ring-slate-200
                        ">
                            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                            {materiaNome}
                        </span>

                        <span className="
                            inline-flex items-center justify-center gap-1.5 rounded-full
                            bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-600
                            ring-1 ring-slate-200
                        ">
                            {data?.publico ? "Público" : "Privado"}
                        </span>

                        {data?.totalCurtidas !== undefined && (
                            <span className="
                                inline-flex items-center justify-center gap-1.5 rounded-full
                                bg-rose-50 px-3 py-1 text-[12px] font-medium text-rose-600
                                ring-1 ring-rose-200
                            ">
                                <Heart className="h-3.5 w-3.5 shrink-0" />
                                {data.totalCurtidas}
                            </span>
                        )}

                        {data?.badge && (
                            <span className="
                                inline-flex items-center justify-center rounded-full
                                bg-violet-50 px-3 py-1 text-[12px] font-medium
                                ring-1 ring-violet-200
                            ">
                                <SummaryBadge
                                    name={data.badge.name}
                                    type={isProfessorBadge ? "professor" : "turma"}
                                    size="sm"
                                />
                            </span>
                        )}

                        {isAdm && typeof data?.reports === "number" && (
                            <span className="
                                inline-flex items-center justify-center gap-1.5 rounded-full
                                bg-orange-50 px-3 py-1 text-[12px] font-medium text-orange-600
                                ring-1 ring-orange-200
                            ">
                                {data.reports} {data.reports === 1 ? "denúncia" : "denúncias"}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                    {isPending && (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-sm text-slate-400 animate-pulse">Carregando resumo...</p>
                        </div>
                    )}

                    {isError && (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
                            Não foi possível carregar o resumo.
                        </p>
                    )}

                    {!isPending && !isError && (
                        <div className="
                            rounded-2xl bg-slate-50 px-5 py-5
                            ring-1 ring-slate-200
                            prose prose-sm max-w-none text-slate-800
                        ">
                            <EditorContent editor={editor} />
                        </div>
                    )}
                </div>

                {!isPending && !isError && (
                    <SummaryActionBar
                        id={id}
                        role={role}
                        isOwner={isOwner}
                        isActive={isActive}
                        isLiked={isAluno ? isLiked : false}
                        hasBadge={hasBadge}
                        isProfessorBadge={isProfessorBadge}
                        onReport={onReport}
                        onToggleLike={onToggleLike}
                        onDesactive={onSoftDeleteSumary}
                        onAssignBadge={onAssignBadge}
                        showId={true}
                        closeOnAction={onClose}
                    />
                )}
            </div>
        </>
    )
}
