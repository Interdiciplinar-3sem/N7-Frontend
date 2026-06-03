import { useEffect } from "react"
import { useGetSummaryId } from "../http/summary/useGetSummaryId"
import { Overlay } from "./overlay"
import { Expand, GraduationCap, Heart, X } from "lucide-react"
import { useNavigate } from "react-router"

type ViweSummaryProps = {
    id: string
    onClose: () => void
    materia?: string
}

export const ViweSummary = ({ id, onClose, materia }: ViweSummaryProps) => {
    const { data, isPending, isError } = useGetSummaryId(id);
    const materiaNome = materia ?? data?.subjectName ?? data?.materia ?? data?.disciplina ?? data?.subject?.name ?? "Matéria não informada"
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    const handleExpand = () => {
        navigate(`/resumo/${id}`)
    }

    return (
        <>
            <Overlay onClose={onClose} />

            <div className="fixed z-100 top-1/2 left-1/2 w-[96vw] max-w-4xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-4xl border border-[#CFE0F2] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] ring-1 ring-black/5">
                <div className="w-full flex items-start justify-between gap-4 border-b border-[#D9E8F8] bg-linear-to-r from-[#EAF4FF] via-white to-[#F6FAFF] px-6 py-6">
                    <button 
                        type="button"
                        onClick={handleExpand}
                        className="flex flex-col justify-start cursor-pointer transition"
                    >
                        <div className="hover:bg-[#EAF4FF] max-w-30 mb-3 inline-flex justify-center items-center gap-2 bg-white px-3 py-1 text-xs font-semibold text-[#2E6EA8] shadow-sm ring-1 ring-[#D9E8F8]">
                            <Expand className="h-3.5 w-3.5" />
                            Tela cheia
                        </div>
                        <h2 className="text-2xl font-bold text-[#1B4F86] wrap-break-word md:text-3xl">
                            {isPending ? "Carregando resumo..." : (data?.titulo ?? "Resumo")}
                        </h2>
                    </button>

                   <section className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-[#D9E8F8] bg-white p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <X size={18} />
                        </button>
                   </section>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                    {isPending && (
                        <p className="text-gray-500">Carregando...</p>
                    )}

                    {isError && (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-red-600">
                            Não foi possível carregar o resumo.
                        </p>
                    )}

                    {!isPending && !isError && (
                        <div className="space-y-4">
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                                    <GraduationCap className="h-4 w-4 text-sky-600" />
                                    <span className="font-medium">{materiaNome}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl bg-[#EAF4FF] px-4 py-3 text-sm text-[#2A577F] ring-1 ring-[#D9E8F8]">
                                    <span className="font-medium">ID: {id}</span>
                                </div>
                                {data?.totalCurtidas !== undefined && (
                                    <div className="flex items-center gap-2 rounded-2xl bg-[#F3F7FB] px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                                        <Heart className="h-4 w-4 text-rose-500" />
                                        <span>Curtidas: {data.totalCurtidas}</span>
                                    </div>
                                )}
                                {typeof data?.reports === 'number' && (
                                    <div className="flex items-center gap-2 rounded-2xl bg-[#F3F7FB] px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                                        <span>Denúncias: {data.reports}</span>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-3xl bg-slate-50 px-5 py-5 ring-1 ring-slate-200">
                                <p className="whitespace-pre-wrap wrap-break-word leading-8 text-[#2A3E55]">
                                {data?.conteudo ?? "Sem conteúdo disponível."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}