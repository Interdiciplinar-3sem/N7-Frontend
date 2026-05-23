import { useEffect } from "react"
import { useGetSummaryId } from "../http/summary/useGetSummaryId"
import { Overlay } from "./overlay"
import { X } from "lucide-react"

type ViweSummaryProps = {
    id: string
    onClose: () => void
}

export const ViweSummary = ({ id, onClose }: ViweSummaryProps) => {
    const { data, isPending, isError } = useGetSummaryId(id);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <>
            <Overlay onClose={onClose} />

            <div className="fixed z-100 top-1/2 left-1/2 w-[94vw] max-w-3xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-[#D9E8F8] bg-white shadow-2xl ring-1 ring-black/5">
                <div className="w-full flex items-start justify-between gap-4 border-b border-[#D9E8F8] bg-gradient-to-r from-[#EAF4FF] via-white to-[#F6FAFF] px-6 py-5">
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-[#1B4F86] wrap-break-word">
                            {isPending ? "Carregando resumo..." : (data?.titulo ?? "Resumo")}
                        </h2>
                        <p className="mt-1 text-sm text-[#4B6E93]">Visualização completa do conteúdo</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-[#D9E8F8] bg-white p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
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
                            <div className="flex flex-wrap gap-2 text-xs text-[#4B6E93]">
                                <span className="rounded-full bg-[#EAF4FF] px-3 py-1">ID: {id}</span>
                                {data?.totalCurtidas !== undefined && (
                                    <span className="rounded-full bg-[#F3F7FB] px-3 py-1">Curtidas: {data.totalCurtidas}</span>
                                )}
                                {typeof data?.reports === 'number' && (
                                    <span className="rounded-full bg-[#F3F7FB] px-3 py-1">Denúncias: {data.reports}</span>
                                )}
                            </div>

                            <p className="whitespace-pre-wrap wrap-break-word leading-7 text-[#2A3E55]">
                            {data?.conteudo ?? "Sem conteúdo disponível."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}