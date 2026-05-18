import { useGetSummaryId } from "../http/summary/useGetSummaryId"
import { Overlay } from "./overlay"
import { X } from "lucide-react"

type ViweSummaryProps = {
    id: string
    onClose: () => void
}

export const ViweSummary = ({ id, onClose }: ViweSummaryProps) => {
    const { data, isPending, isError } = useGetSummaryId(id);

    return (
        <>
            <Overlay />

            <div className="fixed z-100 top-1/2 left-1/2 w-[94vw] max-w-3xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#D9E8F8] bg-[#F6FAFF] shadow-2xl overflow-hidden">
                <div className="w-full flex items-start justify-between gap-4 px-6 py-4 border-b border-[#C9DFF5] bg-linear-to-r from-[#EAF4FF] to-[#F6FAFF]">
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-[#1B4F86] wrap-break-word">
                            {isPending ? "Carregando resumo..." : (data?.titulo ?? "Resumo")}
                        </h2>
                        <p className="text-sm text-[#4B6E93] mt-1">Visualização completa do conteúdo</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-md bg-white text-gray-600 hover:bg-gray-100 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-5 overflow-y-auto max-h-[65vh]">
                    {isPending && (
                        <p className="text-gray-500">Carregando...</p>
                    )}

                    {isError && (
                        <p className="text-red-600">Não foi possível carregar o resumo.</p>
                    )}

                    {!isPending && !isError && (
                        <p className="text-[#2A3E55] leading-7 whitespace-pre-wrap wrap-break-word">
                            {data?.conteudo ?? "Sem conteúdo disponível."}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}